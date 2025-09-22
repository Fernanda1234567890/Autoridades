import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Persona } from 'src/persona/entities/persona.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
    private readonly jwtService: JwtService
  ) {}

  async login(email: string, password: string) {
  const usuario = await this.usuarioRepository.findOne({ where: { email } });
  if (!usuario) throw new BadRequestException('Email o contraseña incorrectos');
  if (!usuario.activo) throw new BadRequestException('Usuario inactivo');

  const passwordMatch = await bcrypt.compare(password, usuario.password);
  if (!passwordMatch) throw new BadRequestException('Email o contraseña incorrectos');

  return {
    user: {
      id: usuario.id,
      name: usuario.name,
      email: usuario.email,
      role: usuario.role,
    },
    access_token: this.jwtService.sign({
      sub: usuario.id,
      email: usuario.email,
      role: usuario.role
    }),
  };
}

async create(createUsuarioDto: CreateUsuarioDto) {
  const { id_persona, ...rest } = createUsuarioDto;

  const existe = await this.usuarioRepository.findOne({ where: { email: rest.email } });
  if (existe) throw new BadRequestException(`Ya existe un usuario con email ${rest.email}`);

  const usuarioData: any = { ...rest, activo: true };

  if (id_persona) {
    const persona = await this.personaRepository.findOne({ where: { id: id_persona } });
    if (!persona) throw new NotFoundException(`Persona con id ${id_persona} no encontrada`);
    usuarioData.persona = persona;
  }

  usuarioData.password = await bcrypt.hash(rest.password, 10);

  const usuario = this.usuarioRepository.create(usuarioData);
  return this.usuarioRepository.save(usuario);
}

  async seed() {
    const datos: CreateUsuarioDto[] = [
      { email: 'admin@uni.edu', password: '123456', name: 'Administrador', role: 'admin' },
      { email: 'usuario1@uni.edu', password: '123456', name: 'Usuario Uno', role: 'usuario' },
      { email: 'usuario2@uni.edu', password: '123456', name: 'Usuario Dos', role: 'usuario' },
    ];

    const usuarios: Usuario[] = [];

    for (const dato of datos) {
      const existe = await this.usuarioRepository.findOne({ where: { email: dato.email } });
      if (existe) {
        usuarios.push(existe);
        continue;
      }

      const hashedPassword = await bcrypt.hash(dato.password, 10);
      const usuario = this.usuarioRepository.create({ ...dato, password: hashedPassword });
      usuarios.push(await this.usuarioRepository.save(usuario));
    }

    return usuarios;
  }

  async deactivate(id: number) {
    const usuario = await this.findOne(id);
    usuario.activo = false;
    return this.usuarioRepository.save(usuario);
  }


  async findAll(admin: boolean = false): Promise<Usuario[]> {
    if (admin) {
      return this.usuarioRepository.find({ relations: ['persona'] });
    }
    return this.usuarioRepository.find({
      where: { activo: true },
      relations: ['persona'],
    });
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id }, relations: ['persona'] });
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return usuario;
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { email }, relations: ['persona'] });
  }

  async update(id: number, dto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    Object.assign(usuario, dto);
    return this.usuarioRepository.save(usuario);
  }

  async changePassword(id: number, current: string, newPassword: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const isMatch = await bcrypt.compare(current, usuario.password);
    if (!isMatch) throw new BadRequestException('Contraseña actual incorrecta');

    usuario.password = await bcrypt.hash(newPassword, 10);
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number) {
    const usuario = await this.findOne(id);
    return this.usuarioRepository.remove(usuario);
  }
}
