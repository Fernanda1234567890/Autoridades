import { PartialType } from '@nestjs/mapped-types';
import { CreateAdministrativeRegularPositionUnitDto } from './create-administrative-regular-position-unit.dto';

export class UpdateAdministrativeRegularPositionUnitDto extends PartialType(CreateAdministrativeRegularPositionUnitDto) {}
