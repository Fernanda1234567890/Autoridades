import { IsEmail, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonaDto } from './create-persona.dto';

export class UpdatePersonaDto extends PartialType(CreatePersonaDto) {
  @IsOptional()
  @IsEmail()
  email?: string;
}
