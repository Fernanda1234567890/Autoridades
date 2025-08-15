import { Inject, Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Repository } from 'typeorm';
import { Persona } from './entities/persona.entity';

@Injectable()
export class PersonaService {
  constructor(
    @Inject('PersonaRepository')
    private readonly personaRepository: Repository<Persona>
  ){}
  async create(createPersonaDto: CreatePersonaDto) {
  
    const nuevaPersona = this.personaRepository.create(createPersonaDto)
    return await this.personaRepository.save(nuevaPersona);
  }

  async findAll() {
    return await this.personaRepository.find({})
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

  findOne(id: number) {
    return `This action returns a #${id} persona`;
  }

  update(id: number, updatePersonaDto: UpdatePersonaDto) {
    return `This action updates a #${id} persona`;
  }

  remove(id: number) {
    return `This action removes a #${id} persona`;
  }
}
