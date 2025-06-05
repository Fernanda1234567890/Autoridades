import { DataFactory, Seeder } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnitType } from './entities/unit-type.entity';
import { faker } from '@faker-js/faker';

/*export class UnitTypeSeeder implements Seeder {
  constructor(
    @InjectRepository(UnitType)
    private readonly repo: Repository<UnitType>,
  ) {}

  async seed(): Promise<any> {
    const data: UnitType[] = [];
    for (let i = 0; i < 10; i++) {
      data.push(
        this.repo.create({
          name: faker.commerce.department(),
          description: faker.lorem.sentence(),
          type: faker.helpers.arrayElement(['academic', 'administrative']),
        }),
      );
    }
    await this.repo.save(data);
  

  async drop(): Promise<any> {
    await this.repo.clear();
  }
}*/