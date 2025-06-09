import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministrativeRegularPositionUnitService } from './administrative-regular-position-unit.service';
import { AdministrativeRegularPositionUnitController } from './administrative-regular-position-unit.controller';
import { AdministrativeRegularPositionUnit } from './entities/administrative-regular-position-unit.entity';
// Si tienes relaciones, impórtalas aquí, por ejemplo:
import { Unit } from '../unit/entities/unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    AdministrativeRegularPositionUnit,
    Unit, // Descomenta si tienes la entidad relacionada
  ])],
  controllers: [AdministrativeRegularPositionUnitController],
  providers: [AdministrativeRegularPositionUnitService],
  exports: [TypeOrmModule], // Opcional, solo si necesitas el repositorio fuera de este módulo
})
export class AdministrativeRegularPositionUnitModule {}