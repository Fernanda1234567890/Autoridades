import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdministrativeRegularPositionUnit } from './entities/administrative-regular-position-unit.entity';
import { CreateAdministrativeRegularPositionUnitDto } from './dto/create-administrative-regular-position-unit.dto';
import { UpdateAdministrativeRegularPositionUnitDto } from './dto/update-administrative-regular-position-unit.dto';

@Injectable()
export class AdministrativeRegularPositionUnitService {
  [x: string]: any;
  seedAdministrativeRegularPositionUnitData: any = [
    {
      regular_position_id: 'regular-position-uuid-1',
      units_id: 'unit-uuid-1',
      administrative_id: 'administrative-uuid-1',
      entry_date: new Date('2023-01-01'),
    },
    {
      regular_position_id: 'regular-position-uuid-2',
      units_id: 'unit-uuid-2',
      administrative_id: 'administrative-uuid-2',
      entry_date: new Date('2023-02-01'),
    },
    {
      regular_position_id: 'regular-position-uuid-3',
      units_id: 'unit-uuid-3',
      administrative_id: 'administrative-uuid-3',
      entry_date: new Date('2023-03-01'),
    },
    {
      regular_position_id: 'regular-position-uuid-4',
      units_id: 'unit-uuid-4',
      administrative_id: 'administrative-uuid-4',
      entry_date: new Date('2023-04-01'),
    }
  ];

  constructor(
    @InjectRepository(AdministrativeRegularPositionUnit)
    private readonly arpuRepository: Repository<AdministrativeRegularPositionUnit>,
  ) {}

  async create(createDto: CreateAdministrativeRegularPositionUnitDto): Promise<AdministrativeRegularPositionUnit> {
    const arpu = this.arpuRepository.create(createDto);
    return await this.arpuRepository.save(arpu);
  }

    async seed(): Promise<AdministrativeRegularPositionUnit[]> {
    const promiseMapped = this.seedAdministrativeRegularPositionUnitData.map(async (data) => {
      const unit = this.administrativeRegularPositionUnitRepository.create(data);
      return this.administrativeRegularPositionUnitRepository.save(unit);
    });
    return (await Promise.all(promiseMapped)).filter(Boolean);
  }

  async findAll(): Promise<AdministrativeRegularPositionUnit[]> {
    return await this.arpuRepository.find({
      relations: ['administrative', 'regularPosition', 'unit'],
    });
  }

  async findOne(options: { id?: string; name?: string }): Promise<AdministrativeRegularPositionUnit> {
    const arpu = await this.arpuRepository.findOne({
      where: options,
      relations: ['administrative', 'regularPosition', 'unit'],
    });
    if (!arpu) {
      throw new NotFoundException(
        `AdministrativeRegularPositionUnits not found with criteria: ${JSON.stringify(options)}`
      );
    }
    return arpu;
  }

  async update(id: string, updateDto: UpdateAdministrativeRegularPositionUnitDto): Promise<AdministrativeRegularPositionUnit> {
    await this.arpuRepository.update(id, updateDto);
    return this.findOne({ id });
  }

  async remove(id: string): Promise<void> {
    await this.arpuRepository.delete(id);
  }
}