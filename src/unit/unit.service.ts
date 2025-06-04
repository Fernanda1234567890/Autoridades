import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private unitRepository: Repository<Unit>,
  ) {}

  async create(createUnitDto: CreateUnitDto): Promise<Unit> {
    const unit = this.unitRepository.create(createUnitDto);
    return this.unitRepository.save(unit);
  }

  async findAll(): Promise<Unit[]> {
    return this.unitRepository.find({
      relations: [
        'unitType', // Relación ManyToOne
        'intermediatePosition', // Relación OneToOne
        'administrativeRegularPositionUnit', // Relación OneToOne
        'parentUnit', // Si manejas jerarquía
        'subunits',   // Si manejas jerarquía inversa
      ],
    });
  }

async findOne(id: string): Promise<Unit> {
  const unit = await this.unitRepository.findOne({
    where: { id },
    relations: [
      'unitType',
      'intermediatePosition',
      'administrativeRegularPositionUnit',
      'parentUnit',
      'subunits',
    ],
  });
  if (!unit) {
    throw new NotFoundException(`Unit with id ${id} not found`);
  }
  return unit;
}

  async update(id: string, updateUnitDto: UpdateUnitDto): Promise<Unit> {
    await this.unitRepository.update(id, updateUnitDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.unitRepository.delete(id);
  }
}
