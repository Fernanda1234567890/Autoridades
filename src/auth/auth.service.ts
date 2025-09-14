import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from 'src/usuario/usuario.service';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
  constructor(
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

  async login(usuarioDto: LoginDto) {
    const usuario = await this.validateUsuario(usuarioDto.email, usuarioDto.password);

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    return {
      email: usuario.email,
      token: this.generateToken(usuario), // ✅ llamamos aquí
    };
  }

  // 🔹 Aquí colocas generateToken
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