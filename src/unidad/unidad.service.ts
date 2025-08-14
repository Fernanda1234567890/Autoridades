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
  ) {}
  async create(createUnidadDto: CreateUnidadDto) {
    const nuevaUnidad = this.unidadRepository.create(createUnidadDto);
    return await this.unidadRepository.save(nuevaUnidad);
  }

  findAll() {
    return `This action returns all unidad`;
  }

   async seed(){
      const datos: CreateUnidadDto[] = [
        {
          id: 1,
          nombre: 'Unidad de Data Center',
          descripcion: 'Unidad encargada de los sistemas informáticos',
          responsable: 'Juan Perez',
          id_unidad: '1',
          id_tipo_unidad: 2
        },
        {
          id: 2,
          nombre: 'Unidad Administrativa',
          descripcion: 'Unidad encargada de la administración general',
          responsable: 'Maria Lopez',
          id_unidad: '2',
          id_tipo_unidad: 2
        }
      ]
  
      const mapeados = datos.map((e)=> this.unidadRepository.create(e))
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
