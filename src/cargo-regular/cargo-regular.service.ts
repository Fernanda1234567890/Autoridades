import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCargoRegularDto } from './dto/create-cargo-regular.dto';
import { UpdateCargoRegularDto } from './dto/update-cargo-regular.dto';
import { CargoRegular } from './entities/cargo-regular.entity';
import { Repository } from 'typeorm';
import { Organizacion } from 'src/organizacion/entities/organizacion.entity';
import { AdministrativoCargoRegularUnidad } from 'src/administrativo-cargo-regular-unidad/entities/administrativo-cargo-regular-unidad.entity';

@Injectable()
export class CargoRegularService {
  constructor(
    @Inject('CargoRegularRepository')
    private readonly cargoRegularRepository: Repository<CargoRegular>
  ) { }
  async create(createCargoRegularDto: CreateCargoRegularDto) {
    const existe = await this.cargoRegularRepository.findOne({
      where: { nombre: createCargoRegularDto.nombre },
    })
    if (existe) {
      throw new BadRequestException(`Ya existe un cargo con nombre ${createCargoRegularDto.nombre}`);
    }
    const nuevoCargoRegular = this.cargoRegularRepository.create(createCargoRegularDto);
    return await this.cargoRegularRepository.save(nuevoCargoRegular);
  }

  async findAll() {
    const cargos_regulares: CargoRegular[] = await this.cargoRegularRepository.find({
      relations: ['administrativo_cargo_regular_unidades', 'administrativo_cargo_regular_unidades.administrativo', 'administrativo_cargo_regular_unidades.unidad']
    })

    const datos_limpios = cargos_regulares.map((cargo: CargoRegular) => {
      const relaciones: any = cargo.administrativo_cargo_regular_unidades?.find((relacion: AdministrativoCargoRegularUnidad) => relacion.fecha_fin === null)
      return {
        ...cargo,
        cantidad: relaciones
      }
    })

    return datos_limpios



  }

  async seed() {

    //await this.cargoRegularRepository.query(`TRUNCATE TABLE cargos-regulares CASCADE`);
    //await this.cargoRegularRepository.clear()
    //await this.cargoRegularRepository.query(`ALTER SEQUENCE "cargos-regulares_id_seq" RESTART WITH 1`)

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

    const mapeados = datos.map((e) => this.cargoRegularRepository.create(e))
    return await this.cargoRegularRepository.save(mapeados)
  }

  async findOne(id: number) {
    const cargoRegular = await this.cargoRegularRepository.findOne({
      where: { id },
      relations: ['administrativo_cargo_regular_unidades', 'administrativo_cargo_regular_unidades.administrativo', 'administrativo_cargo_regular_unidades.unidad']
    });
    console.log(cargoRegular)
    if (!cargoRegular) {
      throw new NotFoundException(`Organizacion con id ${id} no encontrada`);
    }
    return cargoRegular;
  }

  async update(id: number, updateCargoRegularDto: UpdateCargoRegularDto) {
    const cargoRegular = await this.findOne(id);
    Object.assign(cargoRegular, updateCargoRegularDto);
    return await this.cargoRegularRepository.save(cargoRegular);
  }

  remove(id: number) {
    return `This action removes a #${id} cargoRegular`;
  }
}
