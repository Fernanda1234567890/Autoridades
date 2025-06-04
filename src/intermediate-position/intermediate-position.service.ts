import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IntermediatePosition } from './entities/intermediate-position.entity';
import { CreateIntermediatePositionDto } from './dto/create-intermediate-position.dto';
import { UpdateIntermediatePositionDto } from './dto/update-intermediate-position.dto';

@Injectable()
export class IntermediatePositionService {
  constructor(
    @InjectRepository(IntermediatePosition)
    private readonly intermediatePositionRepository: Repository<IntermediatePosition>,
  ) {}

  async create(createDto: CreateIntermediatePositionDto): Promise<IntermediatePosition> {
    const position = this.intermediatePositionRepository.create(createDto);
    return await this.intermediatePositionRepository.save(position);
  }

  async findAll(): Promise<IntermediatePosition[]> {
    return await this.intermediatePositionRepository.find({
      relations: ['unit', 'intermediatePositionProfessors'],
    });
  }

  async findOne(id: string): Promise<IntermediatePosition> {
    const position = await this.intermediatePositionRepository.findOne({
      where: { id },
      relations: ['unit', 'intermediatePositionProfessors'],
    });
    if (!position) {
      throw new NotFoundException(`IntermediatePosition with id ${id} not found`);
    }
    return position;
  }

  async update(id: string, updateDto: UpdateIntermediatePositionDto): Promise<IntermediatePosition> {
    await this.intermediatePositionRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.intermediatePositionRepository.delete(id);
  }
}