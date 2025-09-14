import { BadRequestException, ConflictException, Injectable, NotAcceptableException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { ILike, Repository } from 'typeorm';
import { Persona } from './entities/persona.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryPersonaDto } from './dto/query-persona.dto';


@Injectable()
export class PersonaService {
constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {} 


  // Método unificado para buscar con paginación y filtros
  async findAll(query: QueryPersonaDto) {
    const {
      page = 1,
      limit = 10,
      nombres,
      apellidos,
      ci,
      email,
      direccion,
      fecha_nac,
      estado,
      sortBy = 'id',
      sortOrder = 'ASC'
    } = query;

    const where: any = {};

    // Aplicar filtros
    if (nombres) where.nombres = ILike(`%${nombres}%`);
    if (apellidos) where.apellidos = ILike(`%${apellidos}%`);
    if (ci) where.ci = ILike(`%${ci}%`);
    if (email) where.email = ILike(`%${email}%`);
    if (direccion) where.direccion = ILike(`%${direccion}%`);
    if (fecha_nac) where.fecha_nac = fecha_nac;

    // Filtro de estado
    if (estado === 'activo') where.estado = true;
    else if (estado === 'inactivo') where.estado = false;
    // Si es 'todos' o undefined, no aplicamos filtro

    const [data, total] = await this.personaRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { [sortBy]: sortOrder },
      relations: ['estudiante', 'docente', 'administrativo', 'organizacion_personas'],
    });

    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    };
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
          fecha_nac: '2000-02-29'
        },
        {
          id: 2,
          nombres: 'Armando',
          apellidos: 'Paredes',
          ci: '8754215-a',
          email: 'ape@gmail.com',
          telefono: 79457845,
          direccion: 'Calle falsa 123',
          fecha_nac: '1994-08-26'
        },
       {
          id: 3,
          nombres: 'Maria',
          apellidos: 'Oros',
          ci: '12345000',
          email: 'marial@gmail.com',
          telefono: 76051245,
          direccion: 'Av.Siempre viva 1',
          fecha_nac: '2009-02-02'
        },
        {
          id: 4,
          nombres: 'Luis',
          apellidos: 'Perez',
          ci: '8754298',
          email: 'luis@gmail.com',
          telefono: 79457800,
          direccion: 'Calle falsa 89',
          fecha_nac: '1991-05-20'
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

 async create(createPersonaDto: CreatePersonaDto) {
    // 1. Validar que CI o email no existan
    const existing = await this.personaRepository.findOne({
      where: [
        { ci: createPersonaDto.ci },
        { email: createPersonaDto.email }
      ],
    });

    if (existing) {
      if (existing.ci === createPersonaDto.ci) {
        throw new ConflictException(`La CI ${createPersonaDto.ci} ya está registrada`);
      }
      if (existing.email === createPersonaDto.email) {
        throw new ConflictException(`El email ${createPersonaDto.email} ya está registrado`);
      }
    }

    // 2. Validar y transformar la fecha
    let fechaNacDate: Date;
    try {
      fechaNacDate = new Date(createPersonaDto.fecha_nac);
      
      // Validar que la fecha sea válida
      if (isNaN(fechaNacDate.getTime())) {
        throw new BadRequestException('Formato de fecha inválido');
      }

      // Validar que la fecha no sea futura (opcional)
      if (fechaNacDate > new Date()) {
        throw new BadRequestException('La fecha de nacimiento no puede ser futura');
      }

    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error al procesar la fecha de nacimiento');
    }

    // 3. Crear y guardar la persona
    const persona = this.personaRepository.create({
      ...createPersonaDto,
      fecha_nac: fechaNacDate, // fecha convertida a Date
    });

    return await this.personaRepository.save(persona);
  }

// Actualizar
  async update(id: number, updatePersonaDto: UpdatePersonaDto) {
    const persona = await this.findOne(id);
    Object.assign(persona, updatePersonaDto);
    return await this.personaRepository.save(persona);
  }

  async remove(id: number) {
    const persona = await this.findOne(id);
    if (!persona.estado) {
      throw new BadRequestException('La persona ya está inactiva');
    }
    persona.estado = false;
    await this.personaRepository.save(persona);
    return { success: true, message: `Persona con id ${id} dada de baja` };
  }
}
 