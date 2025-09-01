import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnidadDto } from './dto/create-unidad.dto';
import { UpdateUnidadDto } from './dto/update-unidad.dto';
import { Repository } from 'typeorm';
import { Unidad } from './entities/unidad.entity';

@Injectable()
export class UnidadService {
  constructor(
    @Inject('UnidadRepository')
    private readonly unidadRepository: Repository<Unidad>
  ) { }
  // Crear unidad
  async create(createUnidadDto: CreateUnidadDto) {
    const nuevaUnidad = this.unidadRepository.create(createUnidadDto);
    const saved = await this.unidadRepository.save(nuevaUnidad);
    return {
      success: true,
      message: 'Unidad creada correctamente',
      data: saved,
    };
  }

  // Listar unidades con paginación
  async findAll(page: number = 1, limit: number = 10) {
  const [items, total] = await this.unidadRepository.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
    relations: ['depende_de', 'tipo_unidad', 'dependencias']
  });

  return {
    success: true,
    data: items,
    total,
    page,
    limit,
  };
}


  async seed() {

    //await this.unidadRepository.query(`TRUNCATE TABLE unidades CASCADE`);
    //await this.unidadRepository.clear()
    //await this.unidadRepository.query(`ALTER SEQUENCE unidades_id_seq RESTART WITH 1`)
    
    const datos: CreateUnidadDto[] = [
      {
        id: 1,
        nombre: 'Rectorado',
        descripcion: 'Unidad del Rector',
        responsable: 'Juan Perez',
        id_tipo_unidad: 2,
        estado: true,
      },
      {
        id: 2,
        nombre: 'Data Center',
        descripcion: 'Unidad encargada de la administración de sistemas',
        responsable: 'Maria Lopez',
        id_unidad: 1,
        id_tipo_unidad: 2,
        estado: true,
      }
    ]

    const mapeados = datos.map((e: CreateUnidadDto) => this.unidadRepository.create(e))
    return await this.unidadRepository.save(mapeados)
  }
  // Buscar por ID
  async findOne(id: number) {
    const unidad = await this.unidadRepository.findOne({
      where: { id },
      relations: ['depende_de', 'tipo_unidad', 'cargos_intermedios', 'administrativo_cargo_regular_unidades'],
    });
    if (!unidad) {
      throw new NotFoundException(`Unidad con id ${id} no encontrada`);
    }
    return {
      success: true,
      data: unidad,
    };
  }

  // Búsqueda dinámica
  async search(params: { nombre?: string; responsable?: string; id_tipo_unidad?: number }) {
    const query = this.unidadRepository
      .createQueryBuilder('unidad')
      .leftJoinAndSelect('unidad.tipo_unidad', 'tipo_unidad');

    if (params.nombre) {
      query.andWhere('unidad.nombre ILIKE :nombre', { nombre: `%${params.nombre}%` });
    }

    if (params.responsable) {
      query.andWhere('unidad.responsable ILIKE :responsable', { responsable: `%${params.responsable}%` });
    }

    if (params.id_tipo_unidad) {
      query.andWhere('tipo_unidad.id = :id_tipo_unidad', { id_tipo_unidad: params.id_tipo_unidad });
    }

    const results = await query.getMany();
    return {
      success: true,
      message: results.length > 0 ? 'Resultados encontrados' : 'No se encontraron coincidencias',
      data: results,
    };
  }

 // Actualizar
  async update(id: number, updateUnidadDto: UpdateUnidadDto) {
    const unidad = await this.findOne(id);
    Object.assign(unidad.data, updateUnidadDto); // recordar que findOne devuelve { success, data }
    const updated = await this.unidadRepository.save(unidad.data);
    return {
      success: true,
      message: 'Unidad actualizada correctamente',
      data: updated,
    };
  }

  // Soft delete
    async remove(id: number) {
      const { data: unidad } = await this.findOne(id); // extraemos la unidad
      unidad.estado = false;
      const updated = await this.unidadRepository.save(unidad);

      return {
        success: true,
        message: 'Unidad desactivada correctamente',
        data: updated,
      };
    }

    async restore(id: number) {
      const { data: unidad } = await this.findOne(id); // extraemos la unidad
      unidad.estado = true;
      const updated = await this.unidadRepository.save(unidad);

      return {
        success: true,
        message: 'Unidad reactivada correctamente',
        data: updated,
      };
    }
}
