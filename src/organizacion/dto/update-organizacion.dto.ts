import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizacionDto } from './create-organizacion.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';


export class UpdateOrganizacionDto extends PartialType(CreateOrganizacionDto) {
@IsOptional()
@IsString()
tipo?: string;


@IsOptional()
@IsString()
descripcion?: string;


@IsOptional()
@IsBoolean({ message: 'El estado debe ser true o false' })
estado?: boolean;
}