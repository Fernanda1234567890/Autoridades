import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { AuthService } from '../auth/auth.service';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
  ) {}

  @Post('register')
  async register(@Body() body: any) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const role: 'admin' | 'usuario' = body.role === 'admin' ? 'admin' : 'usuario';

    return this.usuarioService.create({
      name: body.name,
      email: body.email,
      password: hashedPassword, 
      role,
    });
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('seed-admin')
  async seedAdmin() {
    return this.usuarioService.seed();
  }

}
