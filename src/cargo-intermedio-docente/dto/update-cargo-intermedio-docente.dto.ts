import { PartialType } from '@nestjs/mapped-types';
import { CreateCargoIntermedioDocenteDto } from './create-cargo-intermedio-docente.dto';

export class UpdateCargoIntermedioDocenteDto extends PartialType(CreateCargoIntermedioDocenteDto) {}
