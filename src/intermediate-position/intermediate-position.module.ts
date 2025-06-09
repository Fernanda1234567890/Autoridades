import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntermediatePositionService } from './intermediate-position.service';
import { IntermediatePositionController } from './intermediate-position.controller';
import { IntermediatePosition } from './entities/intermediate-position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IntermediatePosition])],
  controllers: [IntermediatePositionController],
  providers: [IntermediatePositionService],
  exports: [TypeOrmModule],
})
export class IntermediatePositionModule {}