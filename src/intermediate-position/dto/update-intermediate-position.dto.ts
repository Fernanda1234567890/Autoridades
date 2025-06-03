import { PartialType } from '@nestjs/mapped-types';
import { CreateIntermediatePositionDto } from './create-intermediate-position.dto';

export class UpdateIntermediatePositionDto extends PartialType(CreateIntermediatePositionDto) {}
