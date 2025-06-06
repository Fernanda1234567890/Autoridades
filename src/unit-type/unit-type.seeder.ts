import { DataFactory, Seeder } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnitType } from './entities/unit-type.entity';

export class UnitTypeSeeder implements Seeder {
  constructor(
    @InjectRepository(UnitType)
     
    private readonly repo: Repository<UnitType>,
  ) {}

  async seed(): Promise<any> {
    const data: UnitType[] = [
      this.repo.create({
        name: 'Unidad Mayor',
        description: 'Unidad de mayor jerarquía',
        type: 'unidad_mayor',
      }),
      this.repo.create({
        name: 'Unidad Intermedia',
        description: 'Unidad de nivel intermedio',
        type: 'unidad_intermedia',
      }),
      this.repo.create({
        name: 'Unidad Subdependiente',
        description: 'Unidad subordinada a otra',
        type: 'unidad_subdependiente',
      }),
    ];
    await this.repo.save(data);
  }

  async drop(): Promise<any> {
    await this.repo.clear();
  }
}