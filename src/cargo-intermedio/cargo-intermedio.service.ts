import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCargoIntermedioDto } from './dto/create-cargo-intermedio.dto';
import { UpdateCargoIntermedioDto } from './dto/update-cargo-intermedio.dto';
import { ILike, Repository } from 'typeorm';
import { CargoIntermedio } from './entities/cargo-intermedio.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CargoIntermedioService {
  constructor(
    @Inject('CargoIntermedioRepository')
    private readonly cargoIntermedioRepository: Repository<CargoIntermedio>
  ) {}
 async create(createCargoIntermedioDto: CreateCargoIntermedioDto) {
    const existe = await this.cargoIntermedioRepository.findOne({
      where: { nombre: createCargoIntermedioDto.nombre },
    });
    if (existe) {
      throw new BadRequestException(`Ya existe un cargo intermedio con nombre ${createCargoIntermedioDto.nombre}`);
    }

    const nuevoCargo = this.cargoIntermedioRepository.create(createCargoIntermedioDto);
    const saved = await this.cargoIntermedioRepository.save(nuevoCargo);

    return {
      success: true,
      message: 'Cargo intermedio creado correctamente',
      data: saved,
    };
  }

  async findAll(page: number = 1, limit: number = 10) {
    const [items, total] = await this.cargoIntermedioRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['unidad'],
    });

    return {
      success: true,
      data: items,
      total,
      page,
      limit,
    };
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
        id_unidad: 1,
      },
      {
        id: 2,
        nombre: 'Supervisor de Operaciones',
        descripcion: 'Responsable de supervisar las operaciones diarias',
        nivel_jerarquico: 3,
        id_unidad: 2,
      }
    ]
            const mapeados = datos.map((e)=> this.cargoIntermedioRepository.create(e))
        return await this.cargoIntermedioRepository.save(mapeados)
  }
  async findOne(id: number) {
    const cargo = await this.cargoIntermedioRepository.findOne({
      where: { id },
      relations: ['unidad'],
    });
    if (!cargo) {
      throw new NotFoundException(`Cargo intermedio con id ${id} no encontrado`);
    }
    return {
      success: true,
      data: cargo,
    };
  }
  async findByName(nombre: string) {
    const cargos = await this.cargoIntermedioRepository.find({
      where: { nombre: ILike(`%${nombre}%`) },
      relations: ['unidad'],
    });

    return {
      success: true,
      message: cargos.length > 0 ? 'Resultados encontrados' : 'No se encontraron coincidencias',
      data: cargos,
    };
  }

  async update(id: number, updateCargoIntermedioDto: UpdateCargoIntermedioDto) {
    const cargo = await this.cargoIntermedioRepository.findOne({ where: { id } });
    if (!cargo) {
      throw new NotFoundException(`Cargo intermedio con id ${id} no encontrado`);
    }

    Object.assign(cargo, updateCargoIntermedioDto);
    const updated = await this.cargoIntermedioRepository.save(cargo);

    return {
      success: true,
      message: 'Cargo intermedio actualizado correctamente',
      data: updated,
    };
  }
}