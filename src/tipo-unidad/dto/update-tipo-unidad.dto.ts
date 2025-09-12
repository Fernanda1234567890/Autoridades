import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoUnidadDto } from './create-tipo-unidad.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTipoUnidadDto extends PartialType(CreateTipoUnidadDto) {
}