import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  name?: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'usuario';
}
