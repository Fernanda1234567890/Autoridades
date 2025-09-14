import {BadRequestException,Injectable,NotFoundException} from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
  ) {}

  // ✅ Crear estudiante
  async create(createDto: CreateEstudianteDto) {
    const { id_persona, ru } = createDto;

    // Verificar que no exista estudiante para esa persona
    const existe = await this.estudianteRepository.findOne({
      where: { id_persona },
    });
    if (existe) {
      throw new BadRequestException(
        `Ya existe un estudiante para la persona con id ${id_persona}`,
      );
    }

    // Crear estudiante forzando estado = true
    const estudiante = this.estudianteRepository.create({
      ...createDto,
      estado: true,
    });

    try {
      const saved = await this.estudianteRepository.save(estudiante);
      return {
        success: true,
        message: 'Estudiante creado correctamente',
        data: saved,
      };
    } catch (err) {
      console.error('Error guardando estudiante:', err);
      throw new BadRequestException('No se pudo guardar el estudiante');
    }
  }

  // ✅ Listar con paginación, búsqueda y estado
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
    const query = this.estudianteRepository
      .createQueryBuilder('est')
      .leftJoinAndSelect('est.persona', 'persona');

    if (search) {
      query.andWhere(
        '(LOWER(persona.nombres) LIKE :search OR LOWER(persona.apellidos) LIKE :search OR persona.ci LIKE :search OR LOWER(est.carrera) LIKE :search)',
        { search: `%${search.toLowerCase()}%` },
      );
    }

    if (estado !== 'todos') {
      query.andWhere('est.estado = :estado', {
        estado: estado === 'activo',
      });
    }

    query.orderBy('est.id', 'DESC');

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

  // ✅ Seed
  async seed() {
    const datos: CreateEstudianteDto[] = [
      {
        id: 1,
        carrera: 'Artes',
        ru: 123456,
        id_persona: 2,
        estado: true,
      },
      {
        id: 2,
        carrera: 'Ingeniería Civil',
        ru: 654321,
        id_persona: 1,
        estado: true,
      },
    ];

    const mapeados = datos.map((e) =>
      this.estudianteRepository.create(e),
    );
    return await this.estudianteRepository.save(mapeados);
  }

// ✅ Buscar por ID
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

  // ✅ Búsqueda dinámica
  async search(params: {
    nombres?: string;
    apellidos?: string;
    ci?: string;
    carrera?: string;
  }) {
    const query = this.estudianteRepository
      .createQueryBuilder('est')
      .leftJoinAndSelect('est.persona', 'persona');

    if (params.nombres) {
      query.andWhere('LOWER(persona.nombres) LIKE :nombre', {
        nombre: `%${params.nombres.toLowerCase()}%`,
      });
    }
    if (params.apellidos) {
      query.andWhere('LOWER(persona.apellidos) LIKE :apellido', {
        apellido: `%${params.apellidos.toLowerCase()}%`,
      });
    }
    if (params.ci) {
      query.andWhere('persona.ci LIKE :ci', { ci: `%${params.ci}%` });
    }
    if (params.carrera) {
      query.andWhere('LOWER(est.carrera) LIKE :carrera', {
        carrera: `%${params.carrera.toLowerCase()}%`,
      });
    }

    const results = await query.getMany();

    return {
      success: true,
      message:
        results.length > 0
          ? 'Resultados encontrados'
          : 'No se encontraron coincidencias',
      data: results,
    };
  }

  // ✅ Actualizar
  async update(id: number, updateDto: UpdateEstudianteDto) {
    const estudiante = await this.findOne(id);
    Object.assign(estudiante, updateDto);
    const updated = await this.estudianteRepository.save(estudiante);

    return {
      success: true,
      message: 'Estudiante actualizado correctamente',
      data: updated,
    };
  }

  // ✅ Soft delete
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

  // ✅ Restaurar
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