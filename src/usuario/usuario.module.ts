import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { Usuario } from './entities/usuario.entity';
import { Persona } from 'src/persona/entities/persona.entity'; // ✅ importar entidad Persona

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Persona])], // Exponer UsuarioRepository
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
