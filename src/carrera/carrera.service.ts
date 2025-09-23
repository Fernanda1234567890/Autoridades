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
      { nombre: 'Carrera de Derecho', sigla: 'CDER',id_facultad: 1  },
      { nombre: 'Carrera de Administración de Empresas', sigla: 'CAE', id_facultad: 2 },
      { nombre: 'Carrera de Contabilidad y Finanzas ', sigla: 'CCF', id_facultad: 2 },
      { nombre: 'Carrera de Economía', sigla: 'CE', id_facultad: 2 },
      { nombre: 'Carrera de Auditoria - Contaduría Pública ', sigla: 'CACP', id_facultad: 2 },
      { nombre: 'Carrera de Ingeniería Comercial ', sigla: 'CICOM', id_facultad: 2 },
       { nombre: 'Carrera de Ingeniería Civil', sigla: 'CICIV', id_facultad: 3 },
      { nombre: 'Carrera de Construcciones Civiles', sigla: 'CCCIV', id_facultad: 3 },
      { nombre: 'Carrera de Ingeniería en Geodesia y Topografía', sigla: 'CIGT', id_facultad: 3 },
       { nombre: 'Carrera de Ingeniería de Minas', sigla: 'CIMIN', id_facultad: 4 },
      { nombre: 'Carrera de Ingenieria de Procesos de materias primas minerales', sigla: 'CIPMPM', id_facultad: 4 },
      { nombre: 'Carrera de Estadística', sigla: 'CEST', id_facultad: 5 },
       { nombre: 'Carrera de Física', sigla: 'CFIS', id_facultad: 5 },
      { nombre: 'Carrera de Ingeniería Informática', sigla: 'CIINF', id_facultad: 5 },
      { nombre: 'Carrera de Matemática', sigla: 'CMAT', id_facultad: 5 },
       { nombre: 'Carrera de Química', sigla: 'CQUI', id_facultad: 5 },
      { nombre: 'Carrera de Turismo', sigla: 'CTUR', id_facultad: 6 },
      { nombre: 'Carrera de Trabajo Social', sigla: 'CTSOC', id_facultad: 6 },
       { nombre: 'Carrera de Lingüística e Idiomas', sigla: 'CLID', id_facultad: 6 },
      { nombre: 'Programa de Ciencias de la Comunicación ', sigla: 'CCCOM', id_facultad: 6 },
      { nombre: 'Carrera de Medicina ', sigla: 'CMED', id_facultad: 7 },
       { nombre: 'Carrera de Ingeniería Agroindustrial', sigla: 'CIAGIND', id_facultad: 8 },
      { nombre: 'Carrera de Ingeniería Agronómica', sigla: 'CINGAGR', id_facultad: 8 },
      { nombre: 'Carrera de Ingeniería en Desarrollo Rural', sigla: 'CIDESR', id_facultad: 8 },
       { nombre: 'Carrera de Ingeniería Geologíca', sigla: 'CIGEO', id_facultad: 9 },
      { nombre: 'Carrera de Ingeniería de Medio Ambiente', sigla: 'CIMAMB', id_facultad: 9 },
      { nombre: 'Carrera de Ingeniería Electrónica', sigla: 'CIELEC', id_facultad: 10 },
       { nombre: 'Carrera de Ingeniería Eléctrica', sigla: 'CIELK', id_facultad: 10 },
      { nombre: 'Carrera de Ingeniería Mecánica', sigla: 'CIMEK', id_facultad: 10 },
      { nombre: 'Carrera de Ingeniería Mecatrónica', sigla: 'CIMECA', id_facultad: 10 },
       { nombre: 'Carrera de Mecánica Automotriz', sigla: 'CINAUT', id_facultad: 10 },
      { nombre: 'Carrera de Artes Musicales', sigla: 'CARTMUS', id_facultad: 11 },
      { nombre: 'Carrera de Artes Plásticas', sigla: 'CARTPLAS', id_facultad: 11 },
       { nombre: 'Carrera de Arquitectura ', sigla: 'CARQUI', id_facultad: 11 },
       { nombre: 'Carrera de Enfermería', sigla: 'CENFER', id_facultad: 12 },
      { nombre: 'Carrera de Ingeniería de Sistemas', sigla: 'CISIS' },
      { nombre: 'Carrera de Odontología ', sigla: 'CODONT' },
       { nombre: 'Programa de Ingeniería en Diseño en Programación Digital', sigla: 'PROGIDPD'},
  
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
