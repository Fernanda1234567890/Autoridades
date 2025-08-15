import { Inject, Injectable } from '@nestjs/common';
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
      },
      {
        id: 2,
        carrera: 'Ingenieria Civil',
        ru: 654321,
        id_persona: 1
      }
    ];

    const mapeados = datos.map((e) => this.estudianteRepository.create(e));
    return this.estudianteRepository.save(mapeados);
  }

  findOne(id: number) {
    return `This action returns a #${id} estudiante`;
  }

  update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    return `This action updates a #${id} estudiante`;
  }

  remove(id: number) {
    return `This action removes a #${id} estudiante`;
  }
}
