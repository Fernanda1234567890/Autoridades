import { Inject, Injectable } from '@nestjs/common';
import { CreateOrganizacionDto } from './dto/create-organizacion.dto';
import { UpdateOrganizacionDto } from './dto/update-organizacion.dto';
import { Repository } from 'typeorm';
import { Organizacion } from './entities/organizacion.entity';

@Injectable()
export class OrganizacionService {
  constructor(
    @Inject('OrganizacionRepository')
    private readonly organizacionRepository: Repository<Organizacion>
  ){}
  async create(createOrganizacionDto: CreateOrganizacionDto) {
    const nuevaOrganizacion = this.organizacionRepository.create(createOrganizacionDto);
    return await this.organizacionRepository.save(nuevaOrganizacion) 
  }

  async findAll() {
    const organizaciones: Organizacion[] = await this.organizacionRepository.find({})
    return organizaciones;
  }

  async seed(){
    const datos = [
      {
        id: 1,
        tipo: 'FUD',
        descripcion: 'descripcion de ejemplo 1'
      },
      {
        id: 2,
        tipo: 'FUL',
        descripcion: 'descripcion de ejemplo 2'
      },
      {
        id: 3,
        tipo: 'STU',
        descripcion: 'descripcion de ejemplo 3'
      }
    ]

    const mapeados = datos.map((e)=> this.organizacionRepository.create(e))
    return await this.organizacionRepository.save(mapeados)
  }

  findOne(id: number) {
    return `This action returns a #${id} organizacion`;
  }

  update(id: number, updateOrganizacionDto: UpdateOrganizacionDto) {
    return `This action updates a #${id} organizacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizacion`;
  }
}
