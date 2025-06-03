import { PartialType } from '@nestjs/mapped-types';
import { CreateRegularPositionDto } from './create-regular-position.dto';

export class UpdateRegularPositionDto extends PartialType(CreateRegularPositionDto) {}
