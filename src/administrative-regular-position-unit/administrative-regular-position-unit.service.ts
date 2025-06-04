import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdministrativeRegularPositionUnit } from './entities/administrative-regular-position-unit.entity';
import { CreateAdministrativeRegularPositionUnitDto } from './dto/create-administrative-regular-position-unit.dto';
import { UpdateAdministrativeRegularPositionUnitDto } from './dto/update-administrative-regular-position-unit.dto';

@Injectable()
export class AdministrativeRegularPositionUnitService {
  constructor(
    @InjectRepository(AdministrativeRegularPositionUnit)
    private readonly arpuRepository: Repository<AdministrativeRegularPositionUnit>,
  ) {}

  async create(createDto: CreateAdministrativeRegularPositionUnitDto): Promise<AdministrativeRegularPositionUnit> {
    const arpu = this.arpuRepository.create(createDto);
    return await this.arpuRepository.save(arpu);
  }

  async findAll(): Promise<AdministrativeRegularPositionUnit[]> {
    return await this.arpuRepository.find({
      relations: ['administrative', 'regularPosition', 'unit'],
    });
  }

  async findOne(id: string): Promise<AdministrativeRegularPositionUnit> {
    const arpu = await this.arpuRepository.findOne({
      where: { id },
      relations: ['administrative', 'regularPosition', 'unit'],
    });
    if (!arpu) {
      throw new NotFoundException(`AdministrativeRegularPositionUnit with id ${id} not found`);
    }
    return arpu;
  }

  async update(id: string, updateDto: UpdateAdministrativeRegularPositionUnitDto): Promise<AdministrativeRegularPositionUnit> {
    await this.arpuRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.arpuRepository.delete(id);
  }
}