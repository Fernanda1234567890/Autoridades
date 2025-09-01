import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizacionDto } from './create-organizacion.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateOrganizacionDto extends PartialType(CreateOrganizacionDto) {
 @IsOptional()
  tipo?: string;

  @IsOptional()
  descripcion?: string;

  @IsBoolean({ message: 'El estado debe ser true o false' })
  @IsOptional()
  estado?: boolean;
}
