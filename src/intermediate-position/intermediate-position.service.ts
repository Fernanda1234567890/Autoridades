import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IntermediatePosition } from './entities/intermediate-position.entity';
import { CreateIntermediatePositionDto } from './dto/create-intermediate-position.dto';
import { UpdateIntermediatePositionDto } from './dto/update-intermediate-position.dto';

@Injectable()
export class IntermediatePositionService {
  seedIntermediatePositionData: any = [
    {
      name: 'Coordinador Académico',
      description: 'Responsable de la coordinación académica',
       hierachical_level: 'Alto',
       unit_id: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
    },
    {
      name: 'Jefe de Laboratorio',
      description: 'Encargado del laboratorio principal',
       hierachical_level: 'Medio',
        unit_id: 'b2c3d4e5-f6a1-8901-2345-6789abcdef01',
    }
  ];

  constructor(
    @InjectRepository(IntermediatePosition)
    private readonly intermediatePositionRepository: Repository<IntermediatePosition>,
  ) {}

  async create(createDto: CreateIntermediatePositionDto): Promise<IntermediatePosition> {
    const position = this.intermediatePositionRepository.create(createDto);
    return await this.intermediatePositionRepository.save(position);
  }

  async seed(): Promise<IntermediatePosition[]> {
    const promiseMapped = this.seedIntermediatePositionData.map(async (data) => {
      const record = this.intermediatePositionRepository.create(data);
      return this.intermediatePositionRepository.save(record);
    });
    return await Promise.all(promiseMapped);
  }

  async findAll(): Promise<IntermediatePosition[]> {
    return await this.intermediatePositionRepository.find({
      relations: ['intermediatePosition', 'person'], // Ajusta según tus relaciones reales
    });
  }

  async findOne(id: string): Promise<IntermediatePosition> {
    const position = await this.intermediatePositionRepository.findOne({
      where: { id },
      relations: ['intermediatePosition', 'person'], // Ajusta según tus relaciones reales
    });
    if (!position) {
      throw new NotFoundException(`IntermediatePositionPerson with id ${id} not found`);
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