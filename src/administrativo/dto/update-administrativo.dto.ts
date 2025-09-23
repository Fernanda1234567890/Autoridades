import { PartialType } from '@nestjs/mapped-types';
import { CreateAdministrativoDto } from './create-administrativo.dto';

export class UpdateAdministrativoDto extends PartialType(CreateAdministrativoDto) {}
