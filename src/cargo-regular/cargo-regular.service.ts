import { Inject, Injectable } from '@nestjs/common';
import { CreateCargoRegularDto } from './dto/create-cargo-regular.dto';
import { UpdateCargoRegularDto } from './dto/update-cargo-regular.dto';
import { CargoRegular } from './entities/cargo-regular.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CargoRegularService {
  constructor(
    @Inject('CargoRegularRepository')
    private readonly cargoRegularRepository: Repository<CargoRegular>
  ){}
  async create(createCargoRegularDto: CreateCargoRegularDto) {
    const nuevoCargoRegular = this.cargoRegularRepository.create(createCargoRegularDto);
    return await this.cargoRegularRepository.save(nuevoCargoRegular);
  }

  findAll() {
    return this.cargoRegularRepository.find({})
  }

  async seed(){
    const datos: CreateCargoRegularDto[] = [
      {
        id: 1,
        nombre: 'jefe de departamento', 
        descripcion: 'descripcion de ejemplo',
        nivel_jerarquico: 1
      },
      {
        id: 2,
        nombre: 'responsable de correspondencia', 
        descripcion: 'descripcion de ejemplo',
        nivel_jerarquico: 2
      },
      {
        id: 3,
        nombre: 'secretaria/o', 
        descripcion: 'descripcion de ejemplo',
        nivel_jerarquico: 3
      },
      {
        id: 4,
        nombre: 'mensajero', 
        descripcion: 'descripcion de ejemplo',
        nivel_jerarquico: 4
      }
    ]

        const mapeados = datos.map((e)=> this.cargoRegularRepository.create(e))
        return await this.cargoRegularRepository.save(mapeados)
  }

  findOne(id: number) {
    return `This action returns a #${id} cargoRegular`;
  }

  update(id: number, updateCargoRegularDto: UpdateCargoRegularDto) {
    return `This action updates a #${id} cargoRegular`;
  }

  remove(id: number) {
    return `This action removes a #${id} cargoRegular`;
  }
}
