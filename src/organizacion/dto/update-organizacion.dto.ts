import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizacionDto } from './create-organizacion.dto';

export class UpdateOrganizacionDto extends PartialType(CreateOrganizacionDto) {}
