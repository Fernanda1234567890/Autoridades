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