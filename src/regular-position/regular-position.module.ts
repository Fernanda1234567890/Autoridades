import { Module } from '@nestjs/common';
import { RegularPositionService } from './regular-position.service';
import { RegularPositionController } from './regular-position.controller';

@Module({
  controllers: [RegularPositionController],
  providers: [RegularPositionService],
})
export class RegularPositionModule {}
