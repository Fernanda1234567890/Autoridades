import { Inject, Injectable } from '@nestjs/common';
import { CreateOrganizacionPersonaDto } from './dto/create-organizacion-persona.dto';
import { UpdateOrganizacionPersonaDto } from './dto/update-organizacion-persona.dto';
import { Repository } from 'typeorm';
import { OrganizacionPersona } from './entities/organizacion-persona.entity';

@Injectable()
export class OrganizacionPersonaService {
  @Inject('OrganizacionPersonaRepository')
  private readonly organizacionPersonaRepository: Repository<OrganizacionPersona>
  create(createOrganizacionPersonaDto: CreateOrganizacionPersonaDto) {
    return 'This action adds a new organizacionPersona';
  }

  findAll() {
    return `This action returns all organizacionPersona`;
  }

  async seed(){

    //await this.organizacionPersonaRepository.query(`TRUNCATE TABLE organizacion-persona CASCADE`);
    //await this.organizacionPersonaRepository.clear()
    //await this.organizacionPersonaRepository.query(`ALTER SEQUENCE "organizacion-persona_id_seq" RESTART WITH 1`)
    
    const datos: CreateOrganizacionPersonaDto[] = [
      {
        id: 1,
        id_organizacion: 1,
        id_persona: 1
      },
      {
        id: 2,
        id_organizacion: 2,
        id_persona: 2
      }
    ];

    const mapeados = datos.map((e) => this.organizacionPersonaRepository.create(e));
    return await this.organizacionPersonaRepository.save(mapeados);
  }
  

  findOne(id: number) {
    return `This action returns a #${id} organizacionPersona`;
  }

  update(id: number, updateOrganizacionPersonaDto: UpdateOrganizacionPersonaDto) {
    return `This action updates a #${id} organizacionPersona`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizacionPersona`;
  }
}