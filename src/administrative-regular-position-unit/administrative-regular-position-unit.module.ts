import { Module } from '@nestjs/common';
import { AdministrativeRegularPositionUnitService } from './administrative-regular-position-unit.service';
import { AdministrativeRegularPositionUnitController } from './administrative-regular-position-unit.controller';

@Module({
  controllers: [AdministrativeRegularPositionUnitController],
  providers: [AdministrativeRegularPositionUnitService],
})
export class AdministrativeRegularPositionUnitModule {}
