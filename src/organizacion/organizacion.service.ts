import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizacionDto } from './dto/create-organizacion.dto';
import { UpdateOrganizacionDto } from './dto/update-organizacion.dto';
import { ILike, Repository } from 'typeorm';
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
    const [result, total] = await this.organizacionRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      withDeleted: true,
    });

    return {
      data: result,
      total,
      page,
      limit,
    };
  }
  async seed() {

    //await this.organizacionRepository.query(`TRUNCATE TABLE organizaciones CASCADE`);
    //await this.organizacionRepository.clear()
    //await this.organizacionRepository.query(`ALTER SEQUENCE organizaciones_id_seq RESTART WITH 1`)

    const datos = [
      {
        id: 1,
        tipo: 'FUD',
        descripcion: 'descripcion de ejemplo 1',
        estado: true,
      },
      {
        id: 2,
        tipo: 'FUL',
        descripcion: 'descripcion de ejemplo 2',
        estado: true,
      },
      {
        id: 3,
        tipo: 'STU',
        descripcion: 'descripcion de ejemplo 3',
        estado: true,
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

  async findByName(nombre: string) {
  const organizaciones = await this.organizacionRepository.find({
    where: { descripcion: ILike(`%${nombre}%`) }, // búsqueda insensible a mayúsculas
  });

  return {
    success: true,
    message: organizaciones.length > 0 ? 'Resultados encontrados' : 'No se encontraron coincidencias',
    data: organizaciones,
  };
}

  //actualizar  
  async update(id: number, updateOrganizacionDto: UpdateOrganizacionDto) {
    const organizacion = await this.findOne(id);
    Object.assign(organizacion, updateOrganizacionDto);
    return await this.organizacionRepository.save(organizacion);
  }
 // "Eliminar" → en realidad desactivar
  async remove(id: number) {
    const organizacion = await this.findOne(id);
    organizacion.estado = false;
    return await this.organizacionRepository.save(organizacion);
  }
  async restore(id: number) {
  const organizacion = await this.findOne(id);
  organizacion.estado = true;
  return await this.organizacionRepository.save(organizacion);
}
}