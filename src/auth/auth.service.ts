import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
//import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
//import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from 'src/usuario/usuario.service';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsuarioService)) 
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}


  async validateUsuario(email: string, password: string): Promise<Usuario | null> {
    const usuario = await this.usuarioService.findByEmail(email);
    if (!usuario) return null;

    const isPasswordValid = await bcrypt.compare(password, usuario.password);
    if (!isPasswordValid) return null;

    return usuario;
  }

    async login(loginDto: { email: string; password: string }) {
      const user = await this.usuarioService.findByEmail(loginDto.email);
      if (!user) throw new UnauthorizedException('Usuario no encontrado');
      const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
      if (!isPasswordValid) throw new UnauthorizedException('Contraseña incorrecta');

      const payload = { sub: user.id, email: user.email };
      return {
        access_token: this.jwtService.sign(payload),
        user,
      };
    }

  generateToken(usuario: Usuario) {
    return this.jwtService.sign({
      id: usuario.id,
      email: usuario.email,
      role: usuario.role,
    });
  }

  async register(body: any) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    return this.usuarioService.create({
      name: body.name,
      email: body.email,
      password: hashedPassword,
      role: body.role || 'usuario',
    });
  }
}