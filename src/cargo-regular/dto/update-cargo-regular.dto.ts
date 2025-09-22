import { PartialType } from '@nestjs/mapped-types';
import { CreateCargoRegularDto } from './create-cargo-regular.dto';

export class UpdateCargoRegularDto extends PartialType(CreateCargoRegularDto) {}

