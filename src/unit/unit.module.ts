import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { Unit } from './entities/unit.entity';
import { UnitTypeService } from 'src/unit-type/unit-type.service';
import { UnitType } from 'src/unit-type/entities/unit-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Unit, 
    UnitType
  ])],
  controllers: [UnitController],
  providers: [UnitService],
  exports: [TypeOrmModule], // Opcional, solo si necesitas el repositorio fuera de este módulo
})
export class UnitModule {}