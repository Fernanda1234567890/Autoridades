import { PartialType } from '@nestjs/mapped-types';
import { CreateAdministrativoCargoRegularUnidadDto } from './create-administrativo-cargo-regular-unidad.dto';

export class UpdateAdministrativoCargoRegularUnidadDto extends PartialType(CreateAdministrativoCargoRegularUnidadDto) {}
