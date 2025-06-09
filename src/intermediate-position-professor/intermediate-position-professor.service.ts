import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IntermediatePositionProfessor } from './entities/intermediate-position-professor.entity';
import { CreateIntermediatePositionProfessorDto } from './dto/create-intermediate-position-professor.dto';
import { UpdateIntermediatePositionProfessorDto } from './dto/update-intermediate-position-professor.dto';

@Injectable()
export class IntermediatePositionProfessorService {
  seedIntermediatePositionProfessorData: any = [
    {
      regular_position_id: 'regular-position-uuid-1',
      unit_id: 1, // Ajusta según tu modelo (number o string)
      administrative_id: 1,
      entry_date: new Date('2023-01-01'),
      // intermediate_position_id y professor_id pueden ser requeridos en tu DTO
      intermediate_position_id: 'intermediate-position-uuid-1',
      professor_id: 'professor-uuid-1',
    },
    {
      regular_position_id: 'regular-position-uuid-2',
      unit_id: 2,
      administrative_id: 2,
      entry_date: new Date('2023-02-01'),
      intermediate_position_id: 'intermediate-position-uuid-2',
      professor_id: 'professor-uuid-2',
    }
  ];
  constructor(
    @InjectRepository(IntermediatePositionProfessor)
    private readonly ippRepository: Repository<IntermediatePositionProfessor>,
  ) {}

  async create(createDto: CreateIntermediatePositionProfessorDto): Promise<IntermediatePositionProfessor> {
    const ipp = this.ippRepository.create(createDto);
    return await this.ippRepository.save(ipp);
  }

    async seed(): Promise<IntermediatePositionProfessor[]> {
    const promiseMapped = this.seedIntermediatePositionProfessorData.map(async (data) => {
      const ipp = this.ippRepository.create(data);
      return this.ippRepository.save(ipp);
    });
    return (await Promise.all(promiseMapped)).filter(Boolean);
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