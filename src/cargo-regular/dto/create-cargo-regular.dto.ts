// export class CreateCargoRegularDto {
//         id?: number;
//         nombre: string;
//         descripcion: string;
//         nivel_jerarquico?: number;
// }

import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateCargoRegularDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsNumber()
  nivel_jerarquico?: number;
}