// import { PartialType } from '@nestjs/mapped-types';
// import { CreateOrganizacionDto } from './create-organizacion.dto';
// import { IsBoolean, IsOptional } from 'class-validator';

// export class UpdateOrganizacionDto extends PartialType(CreateOrganizacionDto) {
//  @IsOptional()
//   tipo?: string;

//   @IsOptional()
//   descripcion?: string;

//   @IsBoolean({ message: 'El estado debe ser true o false' })
//   @IsOptional()
//   estado?: boolean;
// }

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