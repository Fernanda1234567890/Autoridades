import { PartialType } from '@nestjs/mapped-types';
import { CreateFacultadDto } from './create-facultad.dto';

export class UpdateFacultadDto extends PartialType(CreateFacultadDto) {}
