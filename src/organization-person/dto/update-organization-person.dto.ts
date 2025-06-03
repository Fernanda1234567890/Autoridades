import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationPersonDto } from './create-organization-person.dto';

export class UpdateOrganizationPersonDto extends PartialType(CreateOrganizationPersonDto) {}
