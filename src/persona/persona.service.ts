import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { ILike, Repository } from 'typeorm';
import { Persona } from './entities/persona.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PersonaService {
constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

// Crear
  async create(createPersonaDto: CreatePersonaDto) {
    const persona = this.personaRepository.create(createPersonaDto);
    return await this.personaRepository.save(persona);
  }

// Listar con paginación + filtros opcionales
  async findAll(page: number, limit: number, nombre?: string, apellido?: string, ci?: string, estado?: 'activo' | 'inactivo' | 'todos') {
    const where: any = {};

    if (nombre) where.nombres = ILike(`%${nombre}%`);
    if (apellido) where.apellidos = ILike(`%${apellido}%`);
    if (ci) where.ci = ILike(`%${ci}%`);

    if (estado === 'activo') where.estado = true;
    else if (estado === 'inactivo') where.estado = false;

    const [data, total] = await this.personaRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });

    return { data, total, currentPage: page, totalPages: Math.ceil(total / limit),};
  }

  async seed(){

    //await this.personaRepository.query(`TRUNCATE TABLE personas CASCADE`);
    //await this.personaRepository.clear()
    //await this.personaRepository.query(`ALTER SEQUENCE personas_id_seq RESTART WITH 1`)
      const datos: CreatePersonaDto[] = [
        {
          id: 1,
          nombres: 'Nelvi',
          apellidos: 'Ortega',
          ci: '12345678',
          email: 'onel@gmail.com',
          telefono: 76451245,
          direccion: 'Av.Siempre viva 742',
          fecha_nac: '29-02-2000'
        },
        {
          id: 2,
          nombres: 'Armando',
          apellidos: 'Paredes',
          ci: '8754215-a',
          email: 'ape@gmail.com',
          telefono: 79457845,
          direccion: 'Calle falsa 123',
          fecha_nac: '26-08-1994'
        },
       {
          id: 3,
          nombres: 'Maria',
          apellidos: 'Oros',
          ci: '12345000',
          email: 'marial@gmail.com',
          telefono: 76051245,
          direccion: 'Av.Siempre viva 1',
          fecha_nac: '02-02-2009'
        },
        {
          id: 4,
          nombres: 'Luis',
          apellidos: 'Perez',
          ci: '8754298',
          email: 'luis@gmail.com',
          telefono: 79457800,
          direccion: 'Calle falsa 89',
          fecha_nac: '26-08-1991'
        }
      ]

      const mapeados = datos.map((e)=> this.personaRepository.create(e))
      return await this.personaRepository.save(mapeados)

  }

  // Buscar por ID
  async findOne(id: number) {
    const persona = await this.personaRepository.findOne({
      where: { id },
      relations: ['estudiante', 'docente', 'administrativo', 'organizacion_personas'],
    });
    if (!persona) {
      throw new NotAcceptableException(`Persona con id ${id} no encontrada`);
    }
    return persona;
  }

    // 🔹 Búsqueda dinámica (filtros opcionales)
  async search(params: { nombres?: string; apellidos?: string; ci?: string; fecha_nac?: string }) {
    const query = this.personaRepository.createQueryBuilder('persona');

    if (params.nombres) {
      query.andWhere('LOWER(persona.nombres) LIKE :nombres', { nombres: `%${params.nombres.toLowerCase()}%` });
    }
    if (params.apellidos) {
      query.andWhere('LOWER(persona.apellidos) LIKE :apellidos', { apellidos: `%${params.apellidos.toLowerCase()}%` });
    }
    if (params.ci) {
      query.andWhere('persona.ci LIKE :ci', { ci: `%${params.ci}%` });
    }
    if (params.fecha_nac) {
      query.andWhere('persona.fecha_nac = :fecha_nac', { fecha_nac: params.fecha_nac });
    }

    return await query.getMany();
  }
// Actualizar
  async update(id: number, updatePersonaDto: UpdatePersonaDto) {
    const persona = await this.findOne(id);
    Object.assign(persona, updatePersonaDto);
    return await this.personaRepository.save(persona);
  }

  // Ahora: solo marca estado = false
    async remove(id: number) {
      const persona = await this.findOne(id);
      persona.estado = false; // ❌ marca como inactivo
      await this.personaRepository.save(persona); // guarda el cambio
      return { success: true, message: `Persona con id ${id} dada de baja` };

    }
}
 