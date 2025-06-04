import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IntermediatePositionProfessor } from './entities/intermediate-position-professor.entity';
import { CreateIntermediatePositionProfessorDto } from './dto/create-intermediate-position-professor.dto';
import { UpdateIntermediatePositionProfessorDto } from './dto/update-intermediate-position-professor.dto';

@Injectable()
export class IntermediatePositionProfessorService {
  constructor(
    @InjectRepository(IntermediatePositionProfessor)
    private readonly ippRepository: Repository<IntermediatePositionProfessor>,
  ) {}

  async create(createDto: CreateIntermediatePositionProfessorDto): Promise<IntermediatePositionProfessor> {
    const ipp = this.ippRepository.create(createDto);
    return await this.ippRepository.save(ipp);
  }

  async findAll(): Promise<IntermediatePositionProfessor[]> {
    return await this.ippRepository.find({
      relations: ['intermediatePosition', 'professor'],
    });
  }

  async findOne(id: string): Promise<IntermediatePositionProfessor> {
    const ipp = await this.ippRepository.findOne({
      where: { id },
      relations: ['intermediatePosition', 'professor'],
    });
    if (!ipp) {
      throw new NotFoundException(`IntermediatePositionProfessor with id ${id} not found`);
    }
    return ipp;
  }

  async update(id: string, updateDto: UpdateIntermediatePositionProfessorDto): Promise<IntermediatePositionProfessor> {
    await this.ippRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.ippRepository.delete(id);
  }
}