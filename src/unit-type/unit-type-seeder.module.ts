import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitType } from './entities/unit-type.entity';
import { UnitTypeSeeder } from './unit-type.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([UnitType])],
  providers: [UnitTypeSeeder],
  exports: [UnitTypeSeeder],
})
export class UnitTypeSeederModule {}
