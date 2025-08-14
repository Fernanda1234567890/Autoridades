import { Module } from '@nestjs/common';
import { OrganizacionPersonaService } from './organizacion-persona.service';
import { OrganizacionPersonaController } from './organizacion-persona.controller';
import { OrganizacionPersona } from './entities/organizacion-persona.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizacionPersona])],
  controllers: [OrganizacionPersonaController],
  providers: [OrganizacionPersonaService],
})
export class OrganizacionPersonaModule { }
