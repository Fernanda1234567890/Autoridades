import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @Inject('EstudianteRepository')
    private readonly estudianteRepository: Repository<Estudiante>
  ){}
 // Crear estudiante
  async create(createEstudianteDto: CreateEstudianteDto) {
    const existe = await this.estudianteRepository.findOne({
      where: { id_persona: createEstudianteDto.id_persona },
    });
    if (existe) {
      throw new BadRequestException(`Ya existe un estudiante para esta persona`);
    }

    const nuevoEstudiante = this.estudianteRepository.create(createEstudianteDto);
    const saved = await this.estudianteRepository.save(nuevoEstudiante);

    return {
      success: true,
      message: 'Estudiante creado correctamente',
      data: saved,
    };
  }

  // Listar con paginación
  async findAll(page = 1, limit = 10) {
    const [items, total] = await this.estudianteRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['persona'],
    });

    return {
      success: true,
      data: items,
      total,
      page,
      limit,
    };
  }

  async seed(){

    //await this.estudianteRepository.query(`TRUNCATE TABLE estudiantes CASCADE`);
    //await this.estudianteRepository.clear()
    //await this.estudianteRepository.query(`ALTER SEQUENCE estudiantes_id_seq RESTART WITH 1`)
    const datos: CreateEstudianteDto[] = [
      {
        id: 1,
        carrera: 'Artes',
        ru: 123456,
        id_persona: 2,
        estado: true
      },
      {
        id: 2,
        carrera: 'Ingenieria Civil',
        ru: 654321,
        id_persona: 1,
        estado: true
      }
    ];

    const mapeados = datos.map((e) => this.estudianteRepository.create(e));
    return this.estudianteRepository.save(mapeados);
  }

// Buscar por ID
  async findOne(id: number) {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id },
      relations: ['persona'],
    });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con id ${id} no encontrado`);
    }
    return estudiante;
  }
  // Búsqueda por filtros dinámicos
  async search(params: { nombre?: string; apellido?: string; ci?: string; carrera?: string }) {
    const query = this.estudianteRepository.createQueryBuilder('estudiante')
      .leftJoinAndSelect('estudiante.persona', 'persona');

    if (params.nombre) {
      query.andWhere('LOWER(persona.nombres) LIKE :nombre', { nombre: `%${params.nombre.toLowerCase()}%` });
    }
    if (params.apellido) {
      query.andWhere('LOWER(persona.apellidos) LIKE :apellido', { apellido: `%${params.apellido.toLowerCase()}%` });
    }
    if (params.ci) {
      query.andWhere('persona.ci LIKE :ci', { ci: `%${params.ci}%` });
    }
    if (params.carrera) {
      query.andWhere('LOWER(estudiante.carrera) LIKE :carrera', { carrera: `%${params.carrera.toLowerCase()}%` });
    }

    const results = await query.getMany();

    return {
      success: true,
      message: results.length > 0 ? 'Resultados encontrados' : 'No se encontraron coincidencias',
      data: results,
    };
  }
  // Actualizar
  async update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    const estudiante = await this.findOne(id);
    Object.assign(estudiante, updateEstudianteDto);
    const updated = await this.estudianteRepository.save(estudiante);

    return {
      success: true,
      message: 'Estudiante actualizado correctamente',
      data: updated,
    };
  }
// Soft delete
  async remove(id: number) {
    const estudiante = await this.findOne(id);
    estudiante.estado = false;
    const updated = await this.estudianteRepository.save(estudiante);

    return {
      success: true,
      message: 'Estudiante desactivado',
      data: updated,
    };
  }

  // Restaurar estudiante
  async restore(id: number) {
    const estudiante = await this.findOne(id);
    estudiante.estado = true;
    const updated = await this.estudianteRepository.save(estudiante);

    return {
      success: true,
      message: 'Estudiante activado',
      data: updated,
    };
  }
}