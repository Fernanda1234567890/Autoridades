import { Inject, Injectable } from '@nestjs/common';
import { CreateUnidadDto } from './dto/create-unidad.dto';
import { UpdateUnidadDto } from './dto/update-unidad.dto';
import { Repository } from 'typeorm';
import { Unidad } from './entities/unidad.entity';

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
        id_tipo_unidad: 2
      },
      {
        id: 2,
        nombre: 'Data Center',
        descripcion: 'Unidad encargada de la administración de sistemas',
        responsable: 'Maria Lopez',
        id_unidad: 1,
        id_tipo_unidad: 2
      }
    ]

    const mapeados = datos.map((e: CreateUnidadDto) => this.unidadRepository.create(e))
    return await this.unidadRepository.save(mapeados)
  }
  findOne(id: number) {
    return `This action returns a #${id} unidad`;
  }

  update(id: number, updateUnidadDto: UpdateUnidadDto) {
    return `This action updates a #${id} unidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} unidad`;
  }
}
