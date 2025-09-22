import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { Estudiante } from './entities/estudiante.entity';
import { Persona } from 'src/persona/entities/persona.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante, Persona])],
  controllers: [EstudianteController],
  providers: [EstudianteService],
  exports: [EstudianteService],
  
})
export class EstudianteModule { }
