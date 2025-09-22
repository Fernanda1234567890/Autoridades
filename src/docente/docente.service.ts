import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { Repository } from 'typeorm';
import { Docente } from './entities/docente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from 'src/persona/entities/persona.entity';
import { Carrera } from 'src/carrera/entities/carrera.entity';

@Injectable()
export class DocenteService {
  constructor(
    @InjectRepository(Docente)
    private readonly docenteRepository: Repository<Docente>,

    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,

    @InjectRepository(Carrera)
    private readonly carreraRepository: Repository<Carrera>,
  ) {}

 
  async findAll(params: { page?: number; limit?: number; search?: string; estado?: 'activo' | 'inactivo' | 'todos' }) {
    const { page = 1, limit = 10, search, estado = 'activo' } = params;

    const query = this.docenteRepository.createQueryBuilder('docente')
      .leftJoinAndSelect('docente.persona', 'persona')
      .leftJoinAndSelect('docente.carrera', 'carrera');

    if (search) {
      query.andWhere(
        'LOWER(persona.nombres) LIKE :search OR LOWER(persona.apellidos) LIKE :search OR LOWER(carrera.nombre) LIKE :search',
        { search: `%${search.toLowerCase()}%` },
      );
    }

    if (estado !== 'todos') {
      query.andWhere('docente.estado = :estado', { estado: estado === 'activo' });
    }

    query.orderBy('docente.id', 'DESC');

    const [data, total] = await query.skip((page - 1) * limit).take(limit).getManyAndCount();
    return { success: true, data, meta: { total, page, limit } };
  }

  async create(dto: CreateDocenteDto) {
    const persona = await this.personaRepository.findOne({ where: { ci: dto.ci_persona } });
    if (!persona) throw new NotFoundException(`Persona con CI ${dto.ci_persona} no existe`);

    const carrera = await this.carreraRepository.findOne({ where: { id: dto.id_carrera } });
    if (!carrera) throw new BadRequestException(`Carrera con id ${dto.id_carrera} no existe`);

    const existe = await this.docenteRepository.findOne({ where: { id_persona: persona.id } });
    if (existe) throw new BadRequestException(`Ya existe un docente para la persona con CI ${dto.ci_persona}`);

    const docente = this.docenteRepository.create({
      id_persona: persona.id,
      persona,
      carrera,
      estado: true,
    });

    return await this.docenteRepository.save(docente);
  }

    async seed() {
      const datos = [
        { ci_persona: '8704298', id_carrera: 3 },
        { ci_persona: '8750011', id_carrera: 3 },
      ];

      for (const d of datos) {
        try {
          await this.create(d as any); 
        } catch (error) {
          console.log(`No se pudo insertar docente: ${error.message}`);
        }
      }

      return { success: true, message: 'Seed completado' };
    }


  async findOne(id: number) {
    const docente = await this.docenteRepository.findOne({ where: { id }, relations: ['persona', 'carrera'] });
    if (!docente) throw new NotFoundException(`Docente con id ${id} no encontrado`);
    return docente;
  }

  async search(params: { nombre?: string; apellido?: string; ci?: string }) {
    const query = this.docenteRepository.createQueryBuilder('docente')
      .leftJoinAndSelect('docente.persona', 'persona')
      .leftJoinAndSelect('docente.carrera', 'carrera');

    if (params.nombre) query.andWhere('LOWER(persona.nombres) LIKE :nombre', { nombre: `%${params.nombre.toLowerCase()}%` });
    if (params.apellido) query.andWhere('LOWER(persona.apellidos) LIKE :apellido', { apellido: `%${params.apellido.toLowerCase()}%` });
    if (params.ci) query.andWhere('persona.ci LIKE :ci', { ci: `%${params.ci}%` });

    const results = await query.getMany();
    return { success: true, message: results.length > 0 ? 'Resultados encontrados' : 'No se encontraron coincidencias', data: results };
  }

  async update(id: number, updateDto: UpdateDocenteDto) {
    const docente = await this.findOne(id);

    if (updateDto.id_carrera) {
      const carrera = await this.carreraRepository.findOne({ where: { id: updateDto.id_carrera } });
      if (!carrera) throw new BadRequestException(`Carrera con id ${updateDto.id_carrera} no encontrada`);
      docente.carrera = carrera;
    }

    if (updateDto.estado !== undefined) docente.estado = updateDto.estado;

    return await this.docenteRepository.save(docente);
  }

  async remove(id: number) {
    const docente = await this.findOne(id);
    docente.estado = false;
    return await this.docenteRepository.save(docente);
  }

  async restore(id: number) {
    const docente = await this.findOne(id);
    docente.estado = true;
    return await this.docenteRepository.save(docente);
  }
}
