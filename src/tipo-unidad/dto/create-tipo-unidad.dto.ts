import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTipoUnidadDto {
 // @IsOptional()
  id?: number;

  //@IsString()
  //@IsNotEmpty({ message: 'El campo tipo es requerido' })
  tipo: string;

 // @IsString()
  //@IsNotEmpty({ message: 'La descripción es requerida' })
  descripcion: string;

  // @IsOptional()
  // @IsBoolean()
  estado?: boolean;
}