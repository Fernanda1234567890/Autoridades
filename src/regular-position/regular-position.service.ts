import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegularPosition } from './entities/regular-position.entity';
import { CreateRegularPositionDto } from './dto/create-regular-position.dto';
import { UpdateRegularPositionDto } from './dto/update-regular-position.dto';

@Injectable()
export class RegularPositionService {
  constructor(
    @InjectRepository(RegularPosition)
    private readonly regularPositionRepository: Repository<RegularPosition>,
  ) {}

  async create(createDto: CreateRegularPositionDto): Promise<RegularPosition> {
    const position = this.regularPositionRepository.create(createDto);
    return await this.regularPositionRepository.save(position);
  } //crea y guarda una nueva instancia 

  async findAll(): Promise<RegularPosition[]> {
    return await this.regularPositionRepository.find({
      relations: ['administrativeRegularPositionUnit'], // si tienes relaciones, cámbialo//////////
    });
  } //Recupera todos los RegularPosition.

  async findOne(id: string): Promise<RegularPosition> { //Busca el registro por ID.
    const position = await this.regularPositionRepository.findOne({
      where: { id },
      relations: ['administrativeRegularPositionUnit'], // ajusta según relaciones
    });
    if (!position) {
      throw new NotFoundException(`RegularPosition with ID "${id}" not found`);
    }
    return position;
  }

  async update(id: string, updateDto: UpdateRegularPositionDto): Promise<RegularPosition> {
    await this.regularPositionRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.regularPositionRepository.delete(id);
  }
}