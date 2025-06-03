import { Module } from '@nestjs/common';
import { AdministrativeService } from './administrative.service';
import { AdministrativeController } from './administrative.controller';

@Module({
  controllers: [AdministrativeController],
  providers: [AdministrativeService],
})
export class AdministrativeModule {}
