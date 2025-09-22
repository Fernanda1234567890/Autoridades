// docente.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocenteService } from './docente.service';
import { DocenteController } from './docente.controller';
import { Docente } from './entities/docente.entity';
import { Persona } from 'src/persona/entities/persona.entity';
import { Carrera } from 'src/carrera/entities/carrera.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Docente, Persona, Carrera]),],
  controllers: [DocenteController],
  providers: [DocenteService],
  exports: [DocenteService],
  
})
export class DocenteModule { }
