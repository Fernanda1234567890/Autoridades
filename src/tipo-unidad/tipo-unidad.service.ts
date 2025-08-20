import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createTipoUnidadDto: CreateTipoUnidadDto) {
    const existe = await this.tipoUnidadRepository.findOne({
      where: { tipo: createTipoUnidadDto.tipo },
    });
    if (existe){
      throw new BadRequestException(`Ya existe un tipo ed unidad con tipo ${createTipoUnidadDto.tipo}`);
    }
  }

  async findAll() {
    return await this.tipoUnidadRepository.find({})
  }

  async seed(){

    //await this.tipoUnidadRepository.query(`TRUNCATE TABLE tipo-unidades CASCADE`);
    //await this.tipoUnidadRepository.clear()
    //await this.tipoUnidadRepository.query(`ALTER SEQUENCE "tipo-unidades_id_seq" RESTART WITH 1`)
    
    const datos: CreateTipoUnidadDto[] = [
      { id: 1, tipo: 'mayor', descripcion: 'Descripción del Tipo A' },
      { id: 2, tipo: 'unidad intermedia', descripcion: 'Descripción del Tipo B' },
      { id: 3, tipo: 'unidad dependiente', descripcion: 'Descripción del Tipo C' }
    ]

    const mapeados = datos.map((e)=> this.tipoUnidadRepository.create(e))
    return await this.tipoUnidadRepository.save(mapeados)

  }

  async findOne(id: number) {
    const tipoUnidad = await this.tipoUnidadRepository.findOne({
      where: { id },
      relations: ['tipo_unidades']
    });
    if (!tipoUnidad){
      throw new NotFoundException(`tipo de unidad con id ${id} no encontrada`);
    }
    return tipoUnidad;
  }

  async  update(id: number, updateTipoUnidadDto: UpdateTipoUnidadDto) {
    const tipoUnidad = await this.findOne(id);
    Object.assign(tipoUnidad, updateTipoUnidadDto);
    return await this.tipoUnidadRepository.save(tipoUnidad);
  }

  remove(id: number) {
    return `This action removes a #${id} tipoUnidad`;
  }
}
