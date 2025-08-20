import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number) {
    const docente = await this.docenteRepository.findOne ({
      where: { id },
      relations:['docentes']
    });
    if(!docente){
      throw new NotFoundException(`Docente con id ${id} no encontrado`)
    }
    return docente;
  }

  async search(params: { carrera?: string; nombres?: string; apellidos?: string }) {
    const query = this.docenteRepository
      .createQueryBuilder('docente')
      .leftJoinAndSelect('docente.persona', 'persona'); // JOIN con persona

    if (params.carrera) {
      query.andWhere('LOWER(docente.carrera) LIKE :carrera', { carrera: `%${params.carrera.toLowerCase()}%` });
    }

    if (params.nombres) {
      query.andWhere('LOWER(persona.nombres) LIKE :nombres', { nombres: `%${params.nombres.toLowerCase()}%` });
    }

    if (params.apellidos) {
      query.andWhere('LOWER(persona.apellidos) LIKE :apellidos', { apellidos: `%${params.apellidos.toLowerCase()}%` });
    }

    return await query.getMany();
  }

  async update(id: number, updateDocenteDto: UpdateDocenteDto) {
   const docente = await this.findOne(id);
   Object.assign(docente, updateDocenteDto);
   return await this.docenteRepository.save(docente);
  }

  remove(id: number) {
    return `This action removes a #${id} docente`;
  }
}
