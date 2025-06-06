import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnitType } from './entities/unit-type.entity';
import { CreateUnitTypeDto } from './dto/create-unit-type.dto';
import { UpdateUnitTypeDto } from './dto/update-unit-type.dto';

@Injectable()
export class UnitTypeService {
  constructor(
    @InjectRepository(UnitType)
    private readonly unitTypeRepository: Repository<UnitType>, //inyecta el repositorio unittype para operar con la base de datos
  ) {}

  async create(createUnitTypeDto: CreateUnitTypeDto): Promise<UnitType> { //crea una instancias usando datos
    const unitType = this.unitTypeRepository.create(createUnitTypeDto);
    return await this.unitTypeRepository.save(unitType); //inserta a la base de datos
  }

  async findAll(): Promise<UnitType[]> { //obtener todas las instancias de unittype, recupera los registros
    return await this.unitTypeRepository.find({
      relations: ['units'], // si quieres incluir unidades relacionadas con unit
    });
  }

  async findOne(id: string): Promise<UnitType> { //obtener solo por id

    const unitType = await this.unitTypeRepository.findOne({
      where: { id },
      relations: ['unit'],
    });
    if (!unitType) {
      throw new NotFoundException(`UnitType with ID "${id}" not found`); //lanza error 404 cuando no encuentra el registro
    }
    return unitType;
  }

  async update(id: string, updateUnitTypeDto: UpdateUnitTypeDto): Promise<UnitType> { //actualiza
    await this.unitTypeRepository.update(id, updateUnitTypeDto);
    return this.findOne(id); //Si no existe, findOne lanzará el error 404 automáticamente.
  }

  async remove(id: string): Promise<void> {
    await this.unitTypeRepository.delete(id);
  }
}
