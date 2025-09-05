import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoUnidadDto } from './dto/create-tipo-unidad.dto';
import { UpdateTipoUnidadDto } from './dto/update-tipo-unidad.dto';
import { ILike, Repository } from 'typeorm';
import { TipoUnidad } from './entities/tipo-unidad.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface FindAllOptions {
  page?: number;
  limit?: number;
  search?: string;
}

@Injectable()
export class TipoUnidadService {
  constructor(
    @InjectRepository(TipoUnidad)
    private readonly tipoUnidadRepository: Repository<TipoUnidad>
  ) {}

  // Crear
  async create(createTipoUnidadDto: CreateTipoUnidadDto) {
    try {
      const tipoUnidad = this.tipoUnidadRepository.create(createTipoUnidadDto);
      return await this.tipoUnidadRepository.save(tipoUnidad);
    } catch (err) {
      console.error('Error guardando tipo de unidad', err);
      throw new BadRequestException('No se pudo guardar el tipo de unidad');
    }
  }

  // Listar con paginación y búsqueda
  async findAll({ page = 1, limit = 10, search }: FindAllOptions) {
    const query = this.tipoUnidadRepository.createQueryBuilder('tu');

    if (search) {
      query.andWhere(
        'tu.tipo ILIKE :search OR tu.descripcion ILIKE :search',
        { search: `%${search}%` }
      );
    }

    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      success: true,
      message: 'Tipos de unidad obtenidos correctamente',
      data: data,
      meta: {
        totalItems: total,
        itemCount: data.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  // Seed de ejemplo
  async seed() {
    const datos: CreateTipoUnidadDto[] = [
      { id: 1, tipo: 'mayor', descripcion: 'Descripción del Tipo A' },
      { id: 2, tipo: 'unidad intermedia', descripcion: 'Descripción del Tipo B' },
      { id: 3, tipo: 'unidad dependiente', descripcion: 'Descripción del Tipo C' },
    ];

    const mapeados = datos.map((e) => this.tipoUnidadRepository.create(e));
    return await this.tipoUnidadRepository.save(mapeados);
  }

  // Buscar por ID
  async findOne(id: number) {
    const tipoUnidad = await this.tipoUnidadRepository.findOneBy({ id });
    if (!tipoUnidad) throw new NotFoundException(`Tipo de unidad con id ${id} no encontrada`);
    return tipoUnidad;
  }

  // Buscar por tipo
  async findByTipo(tipo: string) {
    const tipoUnidades = await this.tipoUnidadRepository.find({
      where: { descripcion: ILike(`%${tipo}%`) },
    });

    return {
      success: true,
      message: tipoUnidades.length > 0 ? 'Resultados encontrados' : 'No se encontraron resultados',
      data: tipoUnidades,
    };
  }

  // Actualizar
  async update(id: number, dto: UpdateTipoUnidadDto) {
    const tipoUnidad = await this.findOne(id);
    Object.assign(tipoUnidad, dto);
    const updated = await this.tipoUnidadRepository.save(tipoUnidad);

    return {
      success: true,
      message: 'Tipo de unidad actualizado correctamente',
      data: updated,
    };
  }

  // Eliminar
  async remove(id: number) {
    const tipoUnidad = await this.findOne(id);
    await this.tipoUnidadRepository.delete(id);
    return {
      success: true,
      message: `TipoUnidad con id ${id} eliminada correctamente`,
      data: tipoUnidad,
    };
  }
}
