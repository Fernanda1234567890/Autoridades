import { PartialType } from '@nestjs/mapped-types';
import { CreateUsers1Dto } from './create-users1.dto';

export class UpdateUsers1Dto extends PartialType(CreateUsers1Dto) {}
