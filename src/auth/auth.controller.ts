import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
  ) {}

  // 🔹 Registro
    @Post('register')
    async register(@Body() body: any) {
    const role: 'admin' | 'usuario' = body.role === 'admin' ? 'admin' : 'usuario';
    
    return this.usuarioService.create({
        name: body.name,
        email: body.email,
        password: body.password,
        role: role || 'usuario',
    });
    }
// auth.controller.ts
@Post('login')
async login(@Body() loginDto: LoginDto) {
  return this.authService.login(loginDto); // <-- pasas el DTO directamente
}

  // usuario/usuario.controller.ts
    @Get('seed-admin')
    async seedAdmin() {
    return this.usuarioService.seed();
    }

}
