import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntermediatePositionProfessorService } from './intermediate-position-professor.service';
import { IntermediatePositionProfessorController } from './intermediate-position-professor.controller';
import { IntermediatePositionProfessor } from './entities/intermediate-position-professor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IntermediatePositionProfessor])],
  controllers: [IntermediatePositionProfessorController],
  providers: [IntermediatePositionProfessorService],
  exports: [TypeOrmModule], // Opcional, solo si necesitas el repositorio fuera de este módulo
})
export class IntermediatePositionProfessorModule {}