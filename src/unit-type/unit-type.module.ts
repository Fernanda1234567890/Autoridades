import { Module } from '@nestjs/common';
import { UnitTypeService } from './unit-type.service';
import { UnitTypeController } from './unit-type.controller';

@Module({
  controllers: [UnitTypeController],
  providers: [UnitTypeService],
})
export class UnitTypeModule {}
