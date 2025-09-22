import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { Facultad } from './entities/facultad.entity';
import { CreateFacultadDto } from './dto/create-facultad.dto';
import { UpdateFacultadDto } from './dto/update-facultad.dto';

export interface FindAllOptions {
  page?: number;
  limit?: number;
  search?: string;
  estado?: 'activo' | 'inactivo' | 'todos';
}

@Injectable()
export class FacultadService {
  constructor(
    @InjectRepository(Facultad)
    private readonly facultadRepository: Repository<Facultad>,
  ) {}

  async create(createFacultadDto: CreateFacultadDto) {
    const nombre = createFacultadDto.nombre?.trim();
    const sigla = createFacultadDto.sigla?.trim();

    if (!nombre || !sigla) {
      throw new BadRequestException('Nombre y sigla son requeridos');
    }

    const existe = await this.facultadRepository.findOne({ where: { nombre } });
    if (existe) {
      throw new BadRequestException(`Ya existe una facultad con el nombre "${nombre}"`);
    }

    const facultad = this.facultadRepository.create({
      nombre,
      sigla,
      estado: true, 
    });

    return this.facultadRepository.save(facultad);
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
    const query = this.facultadRepository.createQueryBuilder('fac');

    if (search) {
      query.andWhere('fac.nombre ILIKE :search OR fac.sigla ILIKE :search', { search: `%${search}%` });
    }

    if (estado !== 'todos') {
      query.andWhere('fac.estado = :estado', { estado: estado === 'activo' });
    }

    query.orderBy('fac.id', 'DESC');

    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .leftJoinAndSelect('fac.carreras', 'carr') 
      .getManyAndCount();

    return { success: true, data, meta: { total, page, limit } };
  }

  async findOne(id: number) {
    const facultad = await this.facultadRepository.findOne({
      where: { id },
      relations: ['carreras'],
    });
    if (!facultad) throw new NotFoundException('Facultad no encontrada');
    return facultad;
  }

  async findByNombreOrSigla(texto: string) {
    const facultades = await this.facultadRepository.find({
      where: [
        { nombre: ILike(`%${texto}%`) },
        { sigla: ILike(`%${texto}%`) },
      ],
      relations: ['carreras'],
    });

    return {
      success: true,
      message: facultades.length > 0 ? 'Resultados encontrados' : 'No se encontraron coincidencias',
      data: facultades,
    };
  }

  async update(id: number, dto: UpdateFacultadDto) {
    const facultad = await this.findOne(id);
    Object.assign(facultad, dto);
    return this.facultadRepository.save(facultad);
  }

  async remove(id: number) {
    const facultad = await this.findOne(id);

    if (!facultad.estado) {
      throw new BadRequestException('La facultad ya está dada de baja');
    }

    facultad.estado = false;
    await this.facultadRepository.save(facultad);

    return {
      success: true,
      message: 'Facultad dada de baja correctamente',
      data: { id: facultad.id, nombre: facultad.nombre, sigla: facultad.sigla },
    };
  }

  async restore(id: number) {
    const facultad = await this.findOne(id);

    if (facultad.estado) {
      throw new BadRequestException('La facultad ya está activa');
    }

    facultad.estado = true;
    return this.facultadRepository.save(facultad);
  }

  async seed() {
    const datos: CreateFacultadDto[] = [
      { nombre: 'Facultad de Ingeniería', sigla: 'FING' },
      { nombre: 'Facultad de Ingeniería Minera', sigla: 'FINGM' },
      { nombre: 'Facultad de Ciencias Puras', sigla: 'FCP' },
      { nombre: 'Facultad de Ciencias Sociales y Humanísticas', sigla: 'FCSH' },
    ];

    const existentes = await this.facultadRepository.count();
    if (existentes > 0) {
      return { success: true, message: 'Ya existen facultades registradas' };
    }

    const mapeados = datos.map(e => this.facultadRepository.create({ ...e, estado: true }));
    const guardados = await this.facultadRepository.save(mapeados);

    return { success: true, message: 'Seed ejecutado correctamente', data: guardados };
  }
}