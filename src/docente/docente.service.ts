import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { Repository } from 'typeorm';
import { Docente } from './entities/docente.entity';

@Injectable()
export class DocenteService {
  constructor(
    @Inject('DocenteRepository')
    private readonly docenteRepository: Repository<Docente>
  ) { }
// Crear docente
  async create(createDocenteDto: CreateDocenteDto) {
    const existe = await this.docenteRepository.findOne({
      where: { id_persona: createDocenteDto.id_persona },
    });
    if (existe) {
      throw new BadRequestException(`Ya existe un docente para esta persona`);
    }

    const nuevoDocente = this.docenteRepository.create(createDocenteDto);
    const saved = await this.docenteRepository.save(nuevoDocente);

    return {
      success: true,
      message: 'Docente creado correctamente',
      data: saved,
    };
  }
  // Listar con paginación
  async findAll(page = 1, limit = 10) {
    const [items, total] = await this.docenteRepository.findAndCount({
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

  async seed() {

    //await this.docenteRepository.query(`TRUNCATE TABLE docentes CASCADE`);
    //await this.docenteRepository.clear()
    //await this.docenteRepository.query(`ALTER SEQUENCE docentes_id_seq RESTART WITH 1`)
    const datos: CreateDocenteDto[] = [
      {
        id: 1,
        carrera: 'Ingenieria de Sistemas',
        id_persona: 1,
        estado: true,
      },
      {
        id: 2,
        carrera: 'ingenieria de Sistemas',
        id_persona: 2,
        estado: true
      }
    ]

    const mapeados = datos.map((e) => this.docenteRepository.create(e))
    return await this.docenteRepository.save(mapeados)
  }

// Buscar por ID
  async findOne(id: number) {
    const docente = await this.docenteRepository.findOne({
      where: { id },
      relations: ['persona'],
    });
    if (!docente) {
      throw new NotFoundException(`Docente con id ${id} no encontrado`);
    }
    return docente;
  }

// Búsqueda dinámica
  async search(params: { nombre?: string; apellido?: string; ci?: string }) {
    const query = this.docenteRepository.createQueryBuilder('docente')
      .leftJoinAndSelect('docente.persona', 'persona');

    if (params.nombre) {
      query.andWhere('LOWER(persona.nombres) LIKE :nombre', { nombre: `%${params.nombre.toLowerCase()}%` });
    }
    if (params.apellido) {
      query.andWhere('LOWER(persona.apellidos) LIKE :apellido', { apellido: `%${params.apellido.toLowerCase()}%` });
    }
    if (params.ci) {
      query.andWhere('persona.ci LIKE :ci', { ci: `%${params.ci}%` });
    }

    const results = await query.getMany();

    return {
      success: true,
      message: results.length > 0 ? 'Resultados encontrados' : 'No se encontraron coincidencias',
      data: results,
    };
  }

// Actualizar
  async update(id: number, updateDto: UpdateDocenteDto) {
    const docente = await this.findOne(id);
    Object.assign(docente, updateDto);
    const updated = await this.docenteRepository.save(docente);

    return {
      success: true,
      message: 'Docente actualizado correctamente',
      data: updated,
    };
  }

  // Soft delete
  async remove(id: number) {
    const docente = await this.findOne(id);
    docente.estado = false;
    const updated = await this.docenteRepository.save(docente);

    return {
      success: true,
      message: 'Docente desactivado',
      data: updated,
    };
  }

  // Restaurar
  async restore(id: number) {
    const docente = await this.findOne(id);
    docente.estado = true;
    const updated = await this.docenteRepository.save(docente);

    return {
      success: true,
      message: 'Docente activado',
      data: updated,
    };
  }
}