import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCargoIntermedioDto } from './dto/create-cargo-intermedio.dto';
import { UpdateCargoIntermedioDto } from './dto/update-cargo-intermedio.dto';
import { Repository } from 'typeorm';
import { CargoIntermedio } from './entities/cargo-intermedio.entity';
import { NotFoundError } from 'rxjs';

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

    //await this.cargoIntermedioRepository.query(`TRUNCATE TABLE cargos-intermedios CASCADE`);
    //await this.cargoIntermedioRepository.clear()
    //await this.cargoIntermedioRepository.query(`ALTER SEQUENCE "cargos-intermedios_id_seq" RESTART WITH 1`)
    
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
  async findOne(id: number) {
   const cargoIntermedio = await this.cargoIntermedioRepository.findOne({
    where:{ id },
    relations: ['cargos-intermedios'] 
   });
   if(!cargoIntermedio){
    throw new NotFoundException (`Cargo intermedio con id ${id} no encontrado`)
   }
   return cargoIntermedio;
  }

  async findByNombre(nombre: string) {
    const cargoIntermedio = await this.cargoIntermedioRepository.findOne({
      where: { nombre },
      relations: ['unidad'], // aquí puedes cargar la relación con Unidad si la tienes
    });

    if (!cargoIntermedio) {
      throw new NotFoundException(
        `Cargo intermedio con nombre "${nombre}" no encontrado`,
      );
    }

    return cargoIntermedio;
  }
  async update(id: number, updateCargoIntermedioDto: UpdateCargoIntermedioDto) {
    const cargoIntermedio = await this.findOne(id);
    Object.assign(cargoIntermedio, updateCargoIntermedioDto);
    return await this.cargoIntermedioRepository.save(cargoIntermedio);
  }

  remove(id: number) {
    return `This action removes a #${id} cargoIntermedio`;
  }
}
