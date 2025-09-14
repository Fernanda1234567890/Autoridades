import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Persona } from 'src/persona/entities/persona.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

async create(createUsuarioDto: CreateUsuarioDto) {
  const { id_persona, ...rest } = createUsuarioDto; // solo extraemos id_persona

  const usuarioData: any = { ...rest };

  if (id_persona) {
    const personaEncontrada = await this.personaRepository.findOne({ where: { id: id_persona } });
    if (!personaEncontrada) throw new NotFoundException(`Persona con id ${id_persona} no encontrada`);

    usuarioData.persona = personaEncontrada;
    usuarioData.id_persona = personaEncontrada.id;
  }

  const hashedPassword = await bcrypt.hash(rest.password, 10);
  usuarioData.password = hashedPassword;

  const usuario = this.usuarioRepository.create(usuarioData);
  return this.usuarioRepository.save(usuario);
}


  async seed() {
    const personas = await this.personaRepository.find();
    

    const datos: CreateUsuarioDto[] = [
      {
        email: 'admin@uni.edu',
        password: '123456',
        name: 'Administrador',
        role: 'admin',
        
      },
      {
        email: 'usuario1@uni.edu',
        password: '123456',
        name: 'Usuario Uno',
        role: 'usuario',
        
      },
      {
        email: 'usuario2@uni.edu',
        password: '123456',
        name: 'Usuario Dos',
        role: 'usuario',
        
      },
    ];

    const usuarios: Usuario[] = [];
    for (const dato of datos) {
      const hashedPassword = await bcrypt.hash(dato.password, 10);
      const usuario = this.usuarioRepository.create({ ...dato, password: hashedPassword });
      usuarios.push(await this.usuarioRepository.save(usuario));
    }

    return usuarios;
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({ relations: ['persona'] });
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
    const usuario = await this.findOne(id);
    Object.assign(usuario, dto);
    if (dto.password) {
      usuario.password = await bcrypt.hash(dto.password, 10);
    }
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number) {
    const usuario = await this.findOne(id);
    return this.usuarioRepository.remove(usuario);
  }
}
