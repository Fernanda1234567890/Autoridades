import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }

  async login(userDto: LoginDto) {
    const user = await this.validateUser(userDto.email, userDto.password);

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    return {
      email: user.email,
      token: this.generateToken(user), // ✅ llamamos aquí
    };
  }

  // 🔹 Aquí colocas generateToken
  generateToken(user: User) {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  }

  async register(body: any) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    return this.userService.create({
      name: body.name,
      email: body.email,
      password: hashedPassword,
      role: body.role || 'user',
    });
  }
}