import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizacionDto } from './dto/create-organizacion.dto';
import { UpdateOrganizacionDto } from './dto/update-organizacion.dto';
import { ILike, QueryFailedError, Repository } from 'typeorm';
import { Organizacion } from './entities/organizacion.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface FindAllOptions {
  page: number;
  limit: number;
  search?: string;
  estado?: 'activo' | 'inactivo' | 'todos';
}

@Injectable()
export class OrganizacionService {
  constructor(
    @InjectRepository(Organizacion)
    private readonly organizacionRepository: Repository<Organizacion>
  ) { }

  async create(createOrganizacionDto: CreateOrganizacionDto) {
    const tipo = createOrganizacionDto.tipo?.trim();
    const descripcion = createOrganizacionDto.descripcion?.trim();

    if (!tipo || !descripcion) {
      throw new BadRequestException('Tipo y descripción son requeridos');
    }

    const existe = await this.organizacionRepository.findOne({ where: { tipo } });
    if (existe) {
      throw new BadRequestException(`Ya existe una organización con el tipo "${tipo}"`);
    }

    const organizacion = this.organizacionRepository.create({
      tipo,
      descripcion,
      estado: true,
    });

     try {
      const saved = await this.organizacionRepository.save(organizacion);
      return {
        success: true,
        message: 'Organización creada correctamente',
        data: { id: saved.id, tipo: saved.tipo, descripcion: saved.descripcion },
      };
    } catch (err) {
      console.error('Error guardando organización:', err);
      throw new BadRequestException('No se pudo guardar la organización');
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
  }) {
    const query = this.organizacionRepository.createQueryBuilder('org');

    if (search) {
      query.andWhere(
        'org.tipo ILIKE :search OR org.descripcion ILIKE :search',
        { search: `%${search}%` },
      );
    }

    if (estado !== 'todos') {
      query.andWhere('org.estado = :estado', { estado: estado === 'activo' });
    }

    query.orderBy('org.id', 'DESC'); //----ASC

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
  try {
    const existentes = await this.organizacionRepository.count();
    if (existentes > 0) {
      return {
        success: true,
        message: 'Ya existen datos en la base de datos',
        data: []
      };
    }

    const datos = [
      { tipo: 'FUD', descripcion: 'Federacion Universitaria DEpartamental', estado: true },
      { tipo: 'FUL', descripcion: 'Federacion universitaria Local', estado: true },
      { tipo: 'STU', descripcion: 'Sistema de Trabajo Universitario', estado: true }
    ];

    const mapeados = datos.map(e => this.organizacionRepository.create(e));
    const guardados = await this.organizacionRepository.save(mapeados);
    
    return {
      success: true,
      message: 'Datos de seed insertados correctamente',
      data: guardados
    };
  } catch (error) {
    console.error('Error en seed:', error);
    throw new BadRequestException('Error al insertar datos de seed: ' + error.message);
  }
}

  async findOne(id: number) {
    const organizacion = await this.organizacionRepository.findOneBy({ id });
    if (!organizacion) throw new NotFoundException('Organización no encontrada');
    return organizacion;
  }

  async findByTipo(texto: string) {
    const organizaciones = await this.organizacionRepository.find({
      where: { tipo: ILike(`%${texto}%`) },
    });
    return {
      success: true,
      message:
        organizaciones.length > 0
          ? 'Resultados encontrados'
          : 'No se encontraron coincidencias',
      data: organizaciones,
    };
  }

  async update(id: number, dto: UpdateOrganizacionDto) {
    const org = await this.findOne(id);
    Object.assign(org, dto);
    return this.organizacionRepository.save(org);
  }

  async remove(id: number) {
    const organizacion = await this.findOne(id);

    if (!organizacion.estado) {
      throw new BadRequestException('La organización ya está dada de baja');
    }

    organizacion.estado = false;
    await this.organizacionRepository.save(organizacion);

    return {
      success: true,
      message: 'Organización dada de baja correctamente',
      data: { id: organizacion.id, tipo: organizacion.tipo },
    };
  }

  async restore(id: number) {
    const org = await this.findOne(id);
    if (org.estado) throw new BadRequestException('La organización ya está activa');

    org.estado = true;
    return this.organizacionRepository.save(org);
  }
}