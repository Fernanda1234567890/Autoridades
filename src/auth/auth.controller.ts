import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  // 🔹 Registro
    @Post('register')
    async register(@Body() body: any) {
    const role: 'admin' | 'user' = body.role === 'admin' ? 'admin' : 'user';
    
    return this.userService.create({
        name: body.name,
        email: body.email,
        password: body.password,
        role,  // tipo garantizado
    });
    }
// auth.controller.ts
@Post('login')
async login(@Body() loginDto: LoginDto) {
  return this.authService.login(loginDto); // <-- pasas el DTO directamente
}

  // user/user.controller.ts
    @Get('seed-admin')
    async seedAdmin() {
    return this.userService.seedAdmin();
    }

}
