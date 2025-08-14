import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizacionPersonaDto } from './create-organizacion-persona.dto';

export class UpdateOrganizacionPersonaDto extends PartialType(CreateOrganizacionPersonaDto) {}
