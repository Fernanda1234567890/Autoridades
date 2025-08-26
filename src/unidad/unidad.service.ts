import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnidadDto } from './dto/create-unidad.dto';
import { UpdateUnidadDto } from './dto/update-unidad.dto';
import { Repository } from 'typeorm';
import { Unidad } from './entities/unidad.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UnidadService {
  constructor(
    @Inject('UnidadRepository')
    private readonly unidadRepository: Repository<Unidad>
  ) { }
  async create(createUnidadDto: CreateUnidadDto) {
    const nuevaUnidad = this.unidadRepository.create(createUnidadDto);
    return await this.unidadRepository.save(nuevaUnidad);
  }

  async findAll() {
    return await this.unidadRepository.find({ relations: ['depende_de']})
  }

  async seed() {

    //await this.unidadRepository.query(`TRUNCATE TABLE unidades CASCADE`);
    //await this.unidadRepository.clear()
    //await this.unidadRepository.query(`ALTER SEQUENCE unidades_id_seq RESTART WITH 1`)
    
    const datos: CreateUnidadDto[] = [
      {
        id: 1,
        nombre: 'Rectorado',
        descripcion: 'Unidad del Rector',
        responsable: 'Juan Perez',
        id_tipo_unidad: 2,
        estado: true,
      },
      {
        id: 2,
        nombre: 'Data Center',
        descripcion: 'Unidad encargada de la administración de sistemas',
        responsable: 'Maria Lopez',
        id_unidad: 1,
        id_tipo_unidad: 2,
        estado: true,
      }
    ]

    const mapeados = datos.map((e: CreateUnidadDto) => this.unidadRepository.create(e))
    return await this.unidadRepository.save(mapeados)
  }
  async findOne(id: number) {
    const unidad = await this.unidadRepository.findOne({
      where: { id },
      relations: ['unidades']
    });
    if(!unidad){
      throw new NotFoundException(`Administrativo con id ${id} no encontrado`)
    }
    return unidad;
  }

  async search(params: { nombre?: string; responsable?: string; id_tipo_unidad?: number }) {
    const query = this.unidadRepository
      .createQueryBuilder('unidad')
      .leftJoinAndSelect('unidad.tipo_unidad', 'tipo_unidad'); // join con la relación tipo_unidad

    if (params.nombre) {
      query.andWhere('unidad.nombre ILIKE :nombre', { nombre: `%${params.nombre}%` });
    }

    if (params.responsable) {
      query.andWhere('unidad.responsable ILIKE :responsable', { responsable: `%${params.responsable}%` });
    }

    if (params.id_tipo_unidad) {
      query.andWhere('tipo_unidad.id = :id_tipo_unidad', { id_tipo_unidad: params.id_tipo_unidad });
    }

    return await query.getMany();
  }

  async update(id: number, updateUnidadDto: UpdateUnidadDto) {
   const unidad = await this.findOne(id);
   Object.assign(unidad, updateUnidadDto);
   return await this.unidadRepository.save(unidad);
  }

  remove(id: number) {
    return `This action removes a #${id} unidad`;
  }
}
