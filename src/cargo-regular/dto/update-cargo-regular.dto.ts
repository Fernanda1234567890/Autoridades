// import { PartialType } from '@nestjs/mapped-types';
// import { CreateCargoRegularDto } from './create-cargo-regular.dto';
// import { IsOptional, IsString, IsBoolean } from 'class-validator';

// export class UpdateCargoRegularDto extends PartialType(CreateCargoRegularDto) {
//   @IsOptional()
//   @IsBoolean()
//   estado?: boolean;
// }

import { PartialType } from '@nestjs/mapped-types';
import { CreateCargoRegularDto } from './create-cargo-regular.dto';

export class UpdateCargoRegularDto extends PartialType(CreateCargoRegularDto) {}

