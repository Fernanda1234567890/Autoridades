import { Module } from '@nestjs/common';
import { IntermediatePositionService } from './intermediate-position.service';
import { IntermediatePositionController } from './intermediate-position.controller';

@Module({
  controllers: [IntermediatePositionController],
  providers: [IntermediatePositionService],
})
export class IntermediatePositionModule {}
