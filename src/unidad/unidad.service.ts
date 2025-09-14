import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnidadDto } from './dto/create-unidad.dto';
import { UpdateUnidadDto } from './dto/update-unidad.dto';
import { Repository, ILike } from 'typeorm';
import { Unidad } from './entities/unidad.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UnidadService {
  constructor(
    @InjectRepository(Unidad)
    private readonly unidadRepository: Repository<Unidad>
  ) {}
  
  // ✅ Crear unidad
  async create(createUnidadDto: CreateUnidadDto) {
    const nombre = createUnidadDto.nombre?.trim();
    if (!nombre) throw new BadRequestException('El nombre de la unidad es requerido');

    // Validar duplicado
    const existe = await this.unidadRepository.findOne({ where: { nombre } });
    if (existe) throw new BadRequestException(`Ya existe una unidad con el nombre "${nombre}"`);

    const nuevaUnidad = this.unidadRepository.create({
      ...createUnidadDto,
      nombre,
      estado: true,
    });

    const saved = await this.unidadRepository.save(nuevaUnidad);
    return {
      success: true,
      message: 'Unidad creada correctamente',
      data: saved,
    };
  }

  // ✅ Listar unidades con paginación y filtros
    async findAll(
  page = 1,
  limit = 10,
  filters?: {
    nombre?: string;
    responsable?: string;
    id_tipo_unidad?: number | string;
    estado?: 'activo' | 'inactivo' | 'todos';
  }
) {
  const query = this.unidadRepository.createQueryBuilder('unidad')
    // .leftJoinAndSelect('unidad.depende_de', 'depende_de')
    // .leftJoinAndSelect('unidad.tipo_unidad', 'tipo_unidad')
    // .leftJoinAndSelect('unidad.cargos_intermedios', 'cargos_intermedios')

    // // Docentes a través de la tabla intermedia
    // .leftJoinAndSelect('cargos_intermedios.cargo_intermedio_docente', 'cid')
    // .leftJoinAndSelect('cid.docente', 'docente')

    // // Administrativos a través de la tabla intermedia
    // .leftJoinAndSelect('cargos_intermedios.cargo_intermedio_administrativos', 'cia')
    // .leftJoinAndSelect('cia.administrativo', 'administrativo')

    // // Si quieres mantener también tu acr directo (cargo_regular)
    // .leftJoinAndSelect('unidad.administrativo_cargo_regular_unidades', 'acr')
    // .leftJoinAndSelect('acr.administrativo', 'acr_administrativo')
    // .leftJoinAndSelect('acr.cargoRegular', 'cargoRegular');

  // Filtros
  if (filters?.nombre && filters.nombre.trim() !== '') {
    query.andWhere('unidad.nombre ILIKE :nombre', { nombre: `%${filters.nombre.trim()}%` });
  }

  if (filters?.responsable && filters.responsable.trim() !== '') {
    query.andWhere('unidad.responsable ILIKE :responsable', { responsable: `%${filters.responsable.trim()}%` });
  }

  if (filters?.id_tipo_unidad) {
    const tipoId = Number(filters.id_tipo_unidad);
    if (!isNaN(tipoId)) {
      query.andWhere('tipo_unidad.id = :id_tipo_unidad', { id_tipo_unidad: tipoId });
    }
  }

  if (filters?.estado && filters.estado !== 'todos') {
    query.andWhere('unidad.estado = :estado', { estado: filters.estado === 'activo' });
  }

  query.orderBy('unidad.id', 'DESC')
       .skip((page - 1) * limit)
       .take(limit);

  try {
    const [data, total] = await query.getManyAndCount();
    return { success: true, data, meta: { total, page, limit } };
  } catch (error) {
    console.error('Error en findAll Unidad:', error);
    throw new Error('No se pudo obtener la lista de unidades.');
  }
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
  // ✅ Buscar por ID
  async findOne(id: number) {
    const unidad = await this.unidadRepository.findOne({
      where: { id },
      relations: ['depende_de', 'tipo_unidad', 'cargos_intermedios', 'administrativo_cargo_regular_unidades'],
    });
    if (!unidad) throw new NotFoundException(`Unidad con id ${id} no encontrada`);
    return { success: true, data: unidad };
  }

  // ✅ Búsqueda dinámica simple
  async search(params: { nombre?: string; responsable?: string; id_tipo_unidad?: number }) {
    const query = this.unidadRepository.createQueryBuilder('unidad')
      .leftJoinAndSelect('unidad.tipo_unidad', 'tipo_unidad');

    if (params.nombre) query.andWhere('unidad.nombre ILIKE :nombre', { nombre: `%${params.nombre}%` });
    if (params.responsable) query.andWhere('unidad.responsable ILIKE :responsable', { responsable: `%${params.responsable}%` });
    if (params.id_tipo_unidad) query.andWhere('tipo_unidad.id = :id_tipo_unidad', { id_tipo_unidad: params.id_tipo_unidad });

    const results = await query.getMany();
    return {
      success: true,
      message: results.length ? 'Resultados encontrados' : 'No se encontraron coincidencias',
      data: results,
    };
  }

  // ✅ Actualizar unidad
  async update(id: number, dto: UpdateUnidadDto) {
    const { data: unidad } = await this.findOne(id);
    Object.assign(unidad, dto);
    const updated = await this.unidadRepository.save(unidad);
    return {
      success: true,
      message: 'Unidad actualizada correctamente',
      data: updated,
    };
  }

  // ✅ Soft delete
  async remove(id: number) {
    const { data: unidad } = await this.findOne(id);
    if (!unidad.estado) throw new BadRequestException('La unidad ya está desactivada');

    unidad.estado = false;
    const updated = await this.unidadRepository.save(unidad);
    return {
      success: true,
      message: 'Unidad desactivada correctamente',
      data: updated,
    };
  }

  // ✅ Restaurar unidad
  async restore(id: number) {
    const { data: unidad } = await this.findOne(id);
    if (unidad.estado) throw new BadRequestException('La unidad ya está activa');

    unidad.estado = true;
    const updated = await this.unidadRepository.save(unidad);
    return {
      success: true,
      message: 'Unidad reactivada correctamente',
      data: updated,
    };
  }
}
