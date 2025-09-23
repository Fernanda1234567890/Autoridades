import {BadRequestException,Injectable,NotFoundException} from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from 'src/persona/entities/persona.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,

    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}
  
  async create(createDto: CreateEstudianteDto) {
    const { id_persona, ru } = createDto;

    const persona = await this.personaRepository.findOne({ where: { id: id_persona } });
    if (!persona) {
      throw new BadRequestException(`Persona con id ${id_persona} no encontrada`);
    }

    const existe = await this.estudianteRepository.findOne({ where: { id_persona } });
    if (existe) {
      throw new BadRequestException(`Ya existe un estudiante para la persona con id ${id_persona}`);
    }

    const estudiante = this.estudianteRepository.create({ ...createDto, estado: true });
    return await this.estudianteRepository.save(estudiante);
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

//   useEffect(() => {
//   async function fetchPersonas() {
//     try {
//       const res = await axios.get("http://localhost:3000/api/persona");
//       setPersonas(res.data.data); // ajusta según cómo venga la respuesta
//     } catch (error) {
//       console.error("Error cargando personas:", error);
//     }
//   }
//   fetchPersonas();
// }, []);


  async seed() {
    const datos: CreateEstudianteDto[] = [
      {
        carrera: 'Carrera de Odontología ',
        ru: 123450,
        id_persona: 46,
        estado: true,
      },
      {
        carrera: 'Carrera de Arquitectura',
        ru: 654321,
        id_persona: 47,
        estado: true,
      },
    ];

    const mapeados = datos.map((e) =>
      this.estudianteRepository.create(e),
    );
    return await this.estudianteRepository.save(mapeados);
  }

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

    // async findByCI(ci: string): Promise<Persona | null> {
    //   return await this.personaRepository.findOne({
    //     where: { ci },
    //   });
    // }


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