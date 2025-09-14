export class CreateUsuarioDto {
  email: string;
  password: string;
  name: string;
  role?: 'admin' | 'usuario'; // tipo restringido
  id_persona?: number;
}
