import { PartialType } from '@nestjs/mapped-types';
import { CreateDocenteDto } from './create-docente.dto';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';

export class UpdateDocenteDto extends PartialType(CreateDocenteDto) {
  @IsInt()
  @IsOptional()
  id_carrera?: number;

  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
