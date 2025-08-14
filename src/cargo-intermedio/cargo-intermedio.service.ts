import { Inject, Injectable } from '@nestjs/common';
import { CreateCargoIntermedioDto } from './dto/create-cargo-intermedio.dto';
import { UpdateCargoIntermedioDto } from './dto/update-cargo-intermedio.dto';
import { Repository } from 'typeorm';
import { CargoIntermedio } from './entities/cargo-intermedio.entity';

@Injectable()
export class CargoIntermedioService {
  constructor(
    @Inject('CargoIntermedioRepository')
    private readonly cargoIntermedioRepository: Repository<CargoIntermedio>
  ) {}
  async create(createCargoIntermedioDto: CreateCargoIntermedioDto) {
    const nuevoCargoIntermedio = this.cargoIntermedioRepository.create(createCargoIntermedioDto);
    return await this.cargoIntermedioRepository.save(nuevoCargoIntermedio);
  }

  findAll() {
    return `This action returns all cargoIntermedio`;
  }

  async seed(){
    const datos: CreateCargoIntermedioDto[] = [
      {
        id: 1,
        nombre: 'Coordinador de Proyectos',
        descripcion: 'Encargado de coordinar proyectos intermedios',
        nivel_jerarquico: 3,
        id_unidad: 1
      },
      {
        id: 2,
        nombre: 'Supervisor de Operaciones',
        descripcion: 'Responsable de supervisar las operaciones diarias',
        nivel_jerarquico: 3,
        id_unidad: 2
      }
    ]
            const mapeados = datos.map((e)=> this.cargoIntermedioRepository.create(e))
        return await this.cargoIntermedioRepository.save(mapeados)
  }
  findOne(id: number) {
    return `This action returns a #${id} cargoIntermedio`;
  }

  update(id: number, updateCargoIntermedioDto: UpdateCargoIntermedioDto) {
    return `This action updates a #${id} cargoIntermedio`;
  }

  remove(id: number) {
    return `This action removes a #${id} cargoIntermedio`;
  }
}
