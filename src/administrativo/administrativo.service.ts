import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdministrativoDto } from './dto/create-administrativo.dto';
import { UpdateAdministrativoDto } from './dto/update-administrativo.dto';
import { Repository } from 'typeorm';
import { Administrativo } from './entities/administrativo.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface FindAllOptions {
  page: number;
  limit: number;
  search?: string;
}
@Injectable()
export class AdministrativoService {
  constructor(
    @InjectRepository(Administrativo)
    private readonly administrativoRepository: Repository<Administrativo>,
  ) {}

  async create(createDto: CreateAdministrativoDto) {
    const { id_persona } = createDto;

    const existe = await this.administrativoRepository.findOne({
      where: { id_persona },
    });
    if (existe) {
      throw new BadRequestException(
        `Ya existe un administrativo para la persona con id ${id_persona}`,
      );
    }

    const administrativo = this.administrativoRepository.create({
      id_persona,
      estado: true,
    });

    try {
      const saved = await this.administrativoRepository.save(administrativo);
      return {
        success: true,
        message: 'Administrativo creado correctamente',
        data: saved,
      };
    } catch (err) {
      console.error('Error guardando administrativo:', err);
      throw new BadRequestException('No se pudo guardar al administrativo');
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
    const query = this.administrativoRepository
      .createQueryBuilder('admi')
      .leftJoinAndSelect('admi.persona', 'persona')
      .leftJoinAndSelect(
        'admi.administrativo_cargo_regular_unidades',
        'cargos',
      );

    if (search) {
      query.andWhere(
        '(LOWER(persona.nombres) LIKE :search OR LOWER(persona.apellidos) LIKE :search OR persona.ci LIKE :search)',
        { search: `%${search.toLowerCase()}%` },
      );
    }

    if (estado !== 'todos') {
      query.andWhere('admi.estado = :estado', {
        estado: estado === 'activo',
      });
    }

    query.orderBy('admi.id', 'DESC');

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
    const datos: CreateAdministrativoDto[] = [
      { id_persona: 4, estado: true },
      { id_persona: 9, estado: true },
    ];

    const mapeados = datos.map((e) =>
      this.administrativoRepository.create(e),
    );
    return await this.administrativoRepository.save(mapeados);
  }

  async findOne(id: number) {
    const administrativo = await this.administrativoRepository.findOne({
      where: { id },
      relations: ['persona', 'administrativo_cargo_regular_unidades'],
    });
    if (!administrativo) {
      throw new NotFoundException(
        `Administrativo con id ${id} no encontrado`,
      );
    }
    return administrativo;
  }

  async search(params: {
    nombres?: string;
    apellidos?: string;
    ci?: string;
  }) {
    const query = this.administrativoRepository
      .createQueryBuilder('admi')
      .leftJoinAndSelect('admi.persona', 'persona');

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

  async update(id: number, updateDto: UpdateAdministrativoDto) {
    const administrativo = await this.findOne(id);
    Object.assign(administrativo, updateDto);
    const updated = await this.administrativoRepository.save(administrativo);

    return {
      success: true,
      message: 'Administrativo actualizado correctamente',
      data: updated,
    };
  }

  async remove(id: number) {
    const administrativo = await this.findOne(id);
    administrativo.estado = false;
    const updated = await this.administrativoRepository.save(administrativo);

    return {
      success: true,
      message: 'Administrativo desactivado',
      data: updated,
    };
  }

  async restore(id: number) {
    const administrativo = await this.findOne(id);
    administrativo.estado = true;
    const updated = await this.administrativoRepository.save(administrativo);

    return {
      success: true,
      message: 'Administrativo activado',
      data: updated,
    };
  }
}