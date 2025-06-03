import { PartialType } from '@nestjs/mapped-types';
import { CreateAdministrativeDto } from './create-administrative.dto';

export class UpdateAdministrativeDto extends PartialType(CreateAdministrativeDto) {}
