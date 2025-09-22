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
  estado?: 'activo' | 'inactivo' | 'todos';
}

@Injectable()
export class TipoUnidadService {
  constructor(
    @InjectRepository(TipoUnidad)
    private readonly tipoUnidadRepository: Repository<TipoUnidad>
  ) {}
  
  async create(createTipoUnidadDto: CreateTipoUnidadDto) {
    const tipo = createTipoUnidadDto.tipo?.trim();
    const descripcion = createTipoUnidadDto.descripcion?.trim();

    if (!tipo || !descripcion) {
      throw new BadRequestException('Tipo y descripción son requeridos');
    }

    const exists = await this.tipoUnidadRepository.findOne({ where: { tipo, estado: true } });
    if (exists) {
      throw new BadRequestException(`La unidad "${tipo}" ya existe`);
    }

    const tipoUnidad = this.tipoUnidadRepository.create({
      tipo,
      descripcion,
      estado: true,
    });

    try {
      const saved = await this.tipoUnidadRepository.save(tipoUnidad);
      return {
        success: true,
        message: 'Tipo de unidad creado correctamente',
        data: { id: saved.id, tipo: saved.tipo, descripcion: saved.descripcion },
      };
    } catch (err) {
      console.error('Error guardando tipo de unidad:', err);
      throw new BadRequestException('No se pudo guardar el tipo de unidad');
    }
  }

  async findAll({
    page = 1,
    limit = 10,
    search,
    estado = 'activo',
  }: {
    page?: number;
    limit?: number;
    search?: string;
    estado?: 'activo' | 'inactivo' | 'todos';
  }) {    const query = this.tipoUnidadRepository.createQueryBuilder('tu');

    if (search) {
      query.andWhere(
        'tu.tipo ILIKE :search OR tu.descripcion ILIKE :search',
        { search: `%${search}%` }
      );
    }
        if (estado !== 'todos') {
      query.andWhere('tu.estado = :estado', { estado: estado === 'activo' });
    }


    query.orderBy('tu.id', 'DESC'); //---------ASC

    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      success: true,
      data,
      meta: { total, page, limit },
    };
  }

  async seed() {
    const datos: CreateTipoUnidadDto[] = [
      { id: 1, tipo: 'mayor', descripcion: 'Descripción de unidad mayor',estado: true },
      { id: 2, tipo: 'unidad intermedia', descripcion: 'Descripción de unidad intermedia',estado: true },
      { id: 3, tipo: 'unidad dependiente', descripcion: 'Descripción deunidad Dependiente',estado: true },
    ];

    const mapeados = datos.map((e) => this.tipoUnidadRepository.create(e));
    return await this.tipoUnidadRepository.save(mapeados);
  }

  async findOne(id: number) {
    const tipoUnidad = await this.tipoUnidadRepository.findOneBy({ id });
    if (!tipoUnidad) throw new NotFoundException(`Tipo de unidad no encontrada`);
    return tipoUnidad;
  }

  async findByTipo(texto: string) {
    const tipoUnidades = await this.tipoUnidadRepository.find({
      where: { tipo: ILike(`%${texto}%`) },
    });

    return {
      success: true,
      message: tipoUnidades.length > 0 
      ? 'Resultados encontrados' 
      : 'No se encontraron resultados',
      data: tipoUnidades,
    };
  }

  async update(id: number, dto: UpdateTipoUnidadDto) {
    const tipoUnidad = await this.findOne(id);
    Object.assign(tipoUnidad, dto);
    return this.tipoUnidadRepository.save(tipoUnidad);


  }

    async remove(id: number) {
      const tipoUnidad = await this.findOne(id);

      if (!tipoUnidad?.estado) {
        throw new NotFoundException('Tipo de unidad no encontrado');
      }

      tipoUnidad.estado = false; 
      await this.tipoUnidadRepository.save(tipoUnidad);
    
    return {
      success: true,
      message: 'Tipo de unidadse dio de baja correctamente',
      data: { id: tipoUnidad.id, tipo: tipoUnidad.tipo },
    };
  }

  async restore(id:number) {
    const tipoUnidad = await this.findOne(id);
    if(tipoUnidad.estado) throw new BadRequestException('El tipo de unidad ya esta activo');

    tipoUnidad.estado = true;
    return this.tipoUnidadRepository.save(tipoUnidad);
  }
}