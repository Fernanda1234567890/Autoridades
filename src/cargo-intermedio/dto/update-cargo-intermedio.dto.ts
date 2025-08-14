import { PartialType } from '@nestjs/mapped-types';
import { CreateCargoIntermedioDto } from './create-cargo-intermedio.dto';

export class UpdateCargoIntermedioDto extends PartialType(CreateCargoIntermedioDto) {}
