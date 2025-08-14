import { Inject, Injectable } from '@nestjs/common';
import { CreateTipoUnidadDto } from './dto/create-tipo-unidad.dto';
import { UpdateTipoUnidadDto } from './dto/update-tipo-unidad.dto';
import { Repository } from 'typeorm';
import { TipoUnidad } from './entities/tipo-unidad.entity';

@Injectable()
export class TipoUnidadService {
  constructor(
    @Inject('TipoUnidadRepository')
    private readonly tipoUnidadRepository: Repository<TipoUnidad>
  ){}

  create(createTipoUnidadDto: CreateTipoUnidadDto) {
    return 'This action adds a new tipoUnidad';
  }

  async findAll() {
    return await this.tipoUnidadRepository.find({})
  }

  async seed(){
    const datos: CreateTipoUnidadDto[] = [
      { id: 1, tipo: 'mayor', descripcion: 'Descripción del Tipo A' },
      { id: 2, tipo: 'unidad intermedia', descripcion: 'Descripción del Tipo B' },
      { id: 3, tipo: 'unidad dependiente', descripcion: 'Descripción del Tipo C' }
    ]

    const mapeados = datos.map((e)=> this.tipoUnidadRepository.create(e))
    return await this.tipoUnidadRepository.save(mapeados)

  }

  findOne(id: number) {
    return `This action returns a #${id} tipoUnidad`;
  }

  update(id: number, updateTipoUnidadDto: UpdateTipoUnidadDto) {
    return `This action updates a #${id} tipoUnidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoUnidad`;
  }
}
