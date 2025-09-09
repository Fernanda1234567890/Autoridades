export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  role?: 'admin' | 'user'; // tipo restringido
}
