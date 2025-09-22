import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDocenteDto {
  @IsString()
  @IsNotEmpty()
  ci_persona: string; 

  @IsInt()
  @IsNotEmpty()
  id_carrera: number;

  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
