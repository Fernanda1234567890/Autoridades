// import { IsEmail, IsNotEmpty } from 'class-validator';

// export class LoginDto {
//   @IsEmail()
//   email: string;

//   @IsNotEmpty()
//   password: string;
// }

export class LoginDto {
  email: string;
  password: string;
}
