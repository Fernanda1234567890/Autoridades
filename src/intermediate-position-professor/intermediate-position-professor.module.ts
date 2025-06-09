import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntermediatePositionProfessorService } from './intermediate-position-professor.service';
import { IntermediatePositionProfessorController } from './intermediate-position-professor.controller';
import { IntermediatePositionProfessor } from './entities/intermediate-position-professor.entity';
// Si tienes relaciones, impórtalas aquí:
import { IntermediatePosition } from '../intermediate-position/entities/intermediate-position.entity';
import { Professor } from '../professor/entities/professor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    IntermediatePositionProfessor,
    IntermediatePosition, // Descomenta si tienes la entidad relacionada
    Professor,            // Descomenta si tienes la entidad relacionada
  ])],
  controllers: [IntermediatePositionProfessorController],
  providers: [IntermediatePositionProfessorService],
  exports: [TypeOrmModule], // Opcional, solo si necesitas el repositorio fuera de este módulo
})
export class IntermediatePositionProfessorModule {}