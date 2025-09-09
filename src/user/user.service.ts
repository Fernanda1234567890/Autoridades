import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Crear usuario
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  // ✅ Crear admin inicial
  async seedAdmin() {
    const existing = await this.userRepository.findOne({ where: { email: 'admin@uatf.bo' } });
    if (existing) return existing;

    const hashedPassword = await bcrypt.hash('admin123*', 10);
    const admin = this.userRepository.create({
      name: 'Administrador',
      email: 'admin@uatf.bo',
      password: hashedPassword,
      role: 'admin',
    });

    return this.userRepository.save(admin);
  }

  // Buscar todos
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Buscar por ID
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return user;
  }

  // Buscar por email
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Actualizar usuario
  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);
    Object.assign(user, dto);
    if (dto.password) {
      user.password = await bcrypt.hash(dto.password, 10);
    }
    return this.userRepository.save(user);
  }

  // Eliminar usuario
  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }
}
