import { PartialType } from '@nestjs/mapped-types';
import { CreateIntermediatePositionProfessorDto } from './create-intermediate-position-professor.dto';

export class UpdateIntermediatePositionProfessorDto extends PartialType(CreateIntermediatePositionProfessorDto) {}
