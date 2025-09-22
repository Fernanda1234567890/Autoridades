import { IsEmail, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEnum(['admin', 'usuario'])
  role?: 'admin' | 'usuario';

  @IsOptional()
  id_persona?: number;
}
