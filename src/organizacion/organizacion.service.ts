import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizacionDto } from './dto/create-organizacion.dto';
import { UpdateOrganizacionDto } from './dto/update-organizacion.dto';
import { ILike, Repository } from 'typeorm';
import { Organizacion } from './entities/organizacion.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface FindAllOptions {
  page: number;
  limit: number;
  search?: string;
}

@Injectable()
export class OrganizacionService {
  constructor(
    @InjectRepository(Organizacion)
    private readonly organizacionRepository: Repository<Organizacion>
  ) { }

async create(createOrganizacionDto: CreateOrganizacionDto) {
  try {
    const organizacion = this.organizacionRepository.create(createOrganizacionDto);
    return await this.organizacionRepository.save(organizacion);
  } catch (err) {
    console.error("Error guardando organización:", err);
    throw new BadRequestException("No se pudo guardar la organización");
  }
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
    const query = this.organizacionRepository.createQueryBuilder('org');

    if (search) {
      query.andWhere('org.nombre ILIKE :search OR org.descripcion ILIKE :search', {
        search: `%${search}%`,
      });
    }

    if (estado && estado !== 'todos') {
      query.andWhere('org.estado = :estado', { 
        estado: estado === 'activo' });
    }

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
  async seed() {

    //await this.organizacionRepository.query(`TRUNCATE TABLE organizaciones CASCADE`);
    //await this.organizacionRepository.clear()
    //await this.organizacionRepository.query(`ALTER SEQUENCE organizaciones_id_seq RESTART WITH 1`)

    const datos = [
      { id: 1, tipo: 'FUD', descripcion: 'descripcion de ejemplo 1', estado: true, },
      { id: 2,tipo: 'FUL', descripcion: 'descripcion de ejemplo 2', estado: true,},
      { id: 3,tipo: 'STU',descripcion: 'descripcion de ejemplo 3',estado: true,}
    ]

    const mapeados = datos.map((e) => this.organizacionRepository.create(e))
    return await this.organizacionRepository.save(mapeados)
  }

  async findOne(id: number) {
    const organizacion = await this.organizacionRepository.findOneBy({ id });
    if (!organizacion) throw new NotFoundException('Organización no encontrada');
    return organizacion;
  }


    async findByName(nombre: string) {
    const organizaciones = await this.organizacionRepository.find({
    where: { descripcion: ILike(`%${nombre}%`) },
    });
    return {
    success: true,
    message: organizaciones.length > 0 ? 'Resultados encontrados' : 'No se encontraron coincidencias',
    data: organizaciones,
    };
    }

  async setEstado(id: number, estado: boolean) {
    const org = await this.findOne(id);
    org.estado = estado; // ya es boolean
    return this.organizacionRepository.save(org);
  }
    async update(id: number, dto: UpdateOrganizacionDto) {
      const org = await this.findOne(id);
      Object.assign(org, dto);
      return this.organizacionRepository.save(org);
    }
    // Soft delete: marcar estado = false
  async remove(id: number) {
    const organizacion = await this.organizacionRepository.findOneBy({ id });
    if (!organizacion) throw new NotFoundException('Organización no encontrada');

    organizacion.estado = false; // marcar como inactivo
    await this.organizacionRepository.save(organizacion);

    return { success: true, message: 'Organización dada de baja', data: organizacion };
  }
  async restore(id: number) {
    const org = await this.findOne(id);
    org.estado = true;
    return this.organizacionRepository.save(org);
  }
}