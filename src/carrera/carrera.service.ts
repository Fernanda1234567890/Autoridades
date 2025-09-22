import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm';

import { Carrera } from './entities/carrera.entity';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';

export interface FindAllOptions {
  page: number;
  limit: number;
  search?: string;
  estado?: 'activo' | 'inactivo' | 'todos';
}

@Injectable()
export class CarreraService {
  constructor(
    @InjectRepository(Carrera)
    private readonly carreraRepository: Repository<Carrera>,
  ) {}

async create(createCarreraDto: CreateCarreraDto) {
  const nombre = createCarreraDto.nombre?.trim();
  const sigla = createCarreraDto.sigla?.trim();
  const id_facultad = createCarreraDto.id_facultad; // número, no trim

  if (!nombre || !sigla) {
    throw new BadRequestException('Nombre y sigla son requeridos');
  }

  const existe = await this.carreraRepository.findOne({ where: { nombre } });
  if (existe) throw new BadRequestException(`Ya existe una carrera con el nombre "${nombre}"`);

  const carrera = this.carreraRepository.create({
    nombre,
    sigla,
    facultad: id_facultad ? { id: id_facultad } as any : undefined,
    estado: true,
  });

  return this.carreraRepository.save(carrera);
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
  const query = this.carreraRepository.createQueryBuilder('carr');

  if (search) {
    query.andWhere(
      'carr.nombre ILIKE :search OR carr.sigla ILIKE :search',
      { search: `%${search}%` },
    );
  }

  if (estado !== 'todos') {
    query.andWhere('carr.estado = :estado', { estado: estado === 'activo' });
  }

  query.leftJoinAndSelect('carr.facultad', 'fac');


  query.orderBy('carr.id', 'DESC');

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


  async findOne(id: number) {
    const carrera = await this.carreraRepository.findOne({
      where: { id },
      relations: ['facultad'],
    });
    if (!carrera) throw new NotFoundException('Carrera no encontrada');
    return carrera;
  }

  async findByNombreOrSigla(texto: string) {
  const carreras = await this.carreraRepository.find({
    where: [
      { nombre: ILike(`%${texto}%`) },
      { sigla: ILike(`%${texto}%`) },
    ],
    relations: ['facultad'], 
  });

  return {
    success: true,
    message: carreras.length > 0 ? 'Resultados encontrados' : 'No se encontraron coincidencias',
    data: carreras,
  };
}


  async update(id: number, updateCarreraDto: UpdateCarreraDto) {
    const carrera = await this.findOne(id);
    Object.assign(carrera, updateCarreraDto);
    return this.carreraRepository.save(carrera);
  }

  async remove(id: number) {
    const carrera = await this.findOne(id);
    await this.carreraRepository.delete(carrera.id);
    return { success: true, message: 'Carrera eliminada correctamente' };
  }


  async seed() {
    const datos: CreateCarreraDto[] = [
      { nombre: 'Ingeniería de Sistemas', sigla: 'INSIS' },
      { nombre: 'Ingeniería Civil', sigla: 'INCIV' },
      { nombre: 'Derecho', sigla: 'DER' },
      { nombre: 'Medicina', sigla: 'MED' },
    ];

    const existentes = await this.carreraRepository.count();
    if (existentes > 0) {
      return { success: true, message: 'Ya existen carreras registradas' };
    }

    const mapeados = datos.map((e) => this.carreraRepository.create(e));
    const guardados = await this.carreraRepository.save(mapeados);

    return { success: true, message: 'Seed ejecutado correctamente', data: guardados };
  }
}
