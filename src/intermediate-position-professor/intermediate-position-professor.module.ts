import { Module } from '@nestjs/common';
import { IntermediatePositionProfessorService } from './intermediate-position-professor.service';
import { IntermediatePositionProfessorController } from './intermediate-position-professor.controller';

@Module({
  controllers: [IntermediatePositionProfessorController],
  providers: [IntermediatePositionProfessorService],
})
export class IntermediatePositionProfessorModule {}
