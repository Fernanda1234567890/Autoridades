import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
  async create(createEstudianteDto: CreateEstudianteDto) {
    const nuevoEstudiante = this.estudianteRepository.create(createEstudianteDto);
    return await this.estudianteRepository.save(nuevoEstudiante)
  }

  async findAll() {
    const estudiantes = await this.estudianteRepository.find({ relations: ['persona']})
    return estudiantes.map((estudiante)=> ({
      ...estudiante,
      persona:{
        nombres: estudiante.persona.nombres,
        apellidos: estudiante.persona.apellidos
      }
    }))
 
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
        estado: true,
      },
      {
        id: 2,
        carrera: 'Ingenieria Civil',
        ru: 654321,
        id_persona: 1,
        estado: true,
      }
    ];

    const mapeados = datos.map((e) => this.estudianteRepository.create(e));
    return this.estudianteRepository.save(mapeados);
  }

  async findOne(id: number) {
    const estudiante = await this.estudianteRepository.findOne ({
      where: { id },
      relations: ['estudiantes']
    });
    if (!estudiante){
      throw new NotFoundException(`Estudiante con id ${id} no encontrado`);
    }
    return estudiante;
  }

  async search(params: { ru?: number; nombres?: string; apellidos?: string }) {
    const query = this.estudianteRepository
      .createQueryBuilder('estudiante')
      .leftJoinAndSelect('estudiante.persona', 'persona'); // JOIN con persona

    if (params.ru) {
      query.andWhere('estudiante.ru = :ru', { ru: params.ru });
    }

    if (params.nombres) {
      query.andWhere('LOWER(persona.nombres) LIKE :nombres', { nombres: `%${params.nombres.toLowerCase()}%` });
    }

    if (params.apellidos) {
      query.andWhere('LOWER(persona.apellidos) LIKE :apellidos', { apellidos: `%${params.apellidos.toLowerCase()}%` });
    }

    return await query.getMany();
  }


  async update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    const estudiante = await this.findOne(id);
    Object.assign(estudiante, updateEstudianteDto);
    return await this.estudianteRepository.save(estudiante);
  }

  remove(id: number) {
    return `This action removes a #${id} estudiante`;
  }
}
