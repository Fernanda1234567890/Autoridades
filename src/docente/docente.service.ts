import { Inject, Injectable } from '@nestjs/common';
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
  async create(createDocenteDto: CreateDocenteDto) {
    const nuevoDocente = this.docenteRepository.create(createDocenteDto);
    return await this.docenteRepository.save(nuevoDocente);
  }

  async findAll() {
    //obtener los docentes y los mdatos de la relacion persona
    const docentes = await this.docenteRepository.find({ relations: ['persona'] })
    return docentes.map((docente) => ({
      ...docente,
      persona: {
        nombres: docente.persona.nombres,
        apellidos: docente.persona.apellidos
      }
    }))

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
      },
      {
        id: 2,
        carrera: 'ingenieria de Sistemas',
        id_persona: 2
      }
    ]

    const mapeados = datos.map((e) => this.docenteRepository.create(e))
    return await this.docenteRepository.save(mapeados)
  }

  findOne(id: number) {
    return `This action returns a #${id} docente`;
  }

  update(id: number, updateDocenteDto: UpdateDocenteDto) {
    return `This action updates a #${id} docente`;
  }

  remove(id: number) {
    return `This action removes a #${id} docente`;
  }
}
