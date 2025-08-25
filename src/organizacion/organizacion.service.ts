

import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizacionDto } from './dto/create-organizacion.dto';
import { UpdateOrganizacionDto } from './dto/update-organizacion.dto';
import { Repository } from 'typeorm';
import { Organizacion } from './entities/organizacion.entity';

@Injectable()
export class OrganizacionService {
  constructor(
    @Inject('OrganizacionRepository')
    private readonly organizacionRepository: Repository<Organizacion>
  ) { }
  async create(createOrganizacionDto: CreateOrganizacionDto) {
    const existe = await this.organizacionRepository.findOne({
      where: { tipo: createOrganizacionDto.tipo },
    });
    if (existe) {
      throw new BadRequestException(`Ya existe una organización con tipo ${createOrganizacionDto.tipo}`);
    }

    const nuevaOrganizacion = this.organizacionRepository.create(createOrganizacionDto);
    return await this.organizacionRepository.save(nuevaOrganizacion)
  }

  async findAll(page: number = 1, limit: number = 10) {
    const [items, total] = await this.organizacionRepository.findAndCount({
      skip: (page - 1) * limit, // saltar los registros anteriores
      take: limit,              // limitar la cantidad
      // order: { createdAt: 'DESC' }, // opcional: ordenar
    });

    return { items, total };
  }


  async seed() {

    //await this.organizacionRepository.query(`TRUNCATE TABLE organizaciones CASCADE`);
    //await this.organizacionRepository.clear()
    //await this.organizacionRepository.query(`ALTER SEQUENCE organizaciones_id_seq RESTART WITH 1`)

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

    const mapeados = datos.map((e) => this.organizacionRepository.create(e))
    return await this.organizacionRepository.save(mapeados)
  }

  //busqueda por id
  async findOne(id: number) {
    const organizacion = await this.organizacionRepository.findOne({
      where: { id },
      relations: ['organizacion_personas'] //incorporar mas relaciones si existe
    });
    if (!organizacion) {
      throw new NotFoundException(`Organización con id ${id} no encontrada`);
    }
    return organizacion;
  }
  //actualizar  
  async update(id: number, updateOrganizacionDto: UpdateOrganizacionDto) {
    const organizacion = await this.findOne(id);
    Object.assign(organizacion, updateOrganizacionDto);
    return await this.organizacionRepository.save(organizacion);
  }
  //eliminar
  async remove(id: number) {
    // const organizacion = await this.findOne(id);
    // return await this.organizacionRepository.remove(organizacion);
  }
}