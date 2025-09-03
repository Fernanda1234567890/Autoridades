import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdministrativoDto } from './dto/create-administrativo.dto';
import { UpdateAdministrativoDto } from './dto/update-administrativo.dto';
import { Repository } from 'typeorm';
import { Administrativo } from './entities/administrativo.entity';

@Injectable()
export class AdministrativoService {
  constructor(
    @Inject('AdministrativoRepository')
    private readonly administrativoRepository: Repository<Administrativo>
  ) { }
  // Crear administrativo
  async create(createDto: CreateAdministrativoDto) {
    const existe = await this.administrativoRepository.findOne({
      where: { id_persona: createDto.id_persona },
    });
    if (existe) {
      throw new BadRequestException('Ya existe un administrativo para esta persona');
    }

    const nuevo = this.administrativoRepository.create(createDto);
    const saved = await this.administrativoRepository.save(nuevo);

    return {
      success: true,
      message: 'Administrativo creado correctamente',
      data: saved,
    };
  }

 // Listar con paginación
  async findAll(page = 1, limit = 10) {
    const [items, total] = await this.administrativoRepository.findAndCount({
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

    //await this.administrativoRepository.query(`TRUNCATE TABLE administrativo CASCADE`);
    //await this.administrativoRepository.clear()
    //await this.administrativoRepository.query(`ALTER SEQUENCE administrativo_id_seq RESTART WITH 1`)
    const datos: CreateAdministrativoDto[] = [
      {
        id: 1,
        id_persona: 4,
        estado: true,
      },
      {
        id: 2,
        id_persona: 3,
        estado: true,
      }
    ]

    const mapeados = datos.map((e) => this.administrativoRepository.create(e))
    return await this.administrativoRepository.save(mapeados)
  }

// Buscar por ID
  async findOne(id: number) {
    const administrativo = await this.administrativoRepository.findOne({
      where: { id },
      relations: ['persona'],
    });
    if (!administrativo) {
      throw new NotFoundException(`Administrativo con id ${id} no encontrado`);
    }
    return administrativo;
  }

// Búsqueda dinámica
  async search(params: { nombres?: string; apellidos?: string; ci?: string }) {
    const query = this.administrativoRepository.createQueryBuilder('administrativo')
      .leftJoinAndSelect('administrativo.persona', 'persona');

    if (params.nombres) {
      query.andWhere('LOWER(persona.nombres) LIKE :nombre', { nombre: `%${params.nombres.toLowerCase()}%` });
    }
    if (params.apellidos) {
      query.andWhere('LOWER(persona.apellidos) LIKE :apellido', { apellido: `%${params.apellidos.toLowerCase()}%` });
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
// Soft delete
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

  // Restaurar
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