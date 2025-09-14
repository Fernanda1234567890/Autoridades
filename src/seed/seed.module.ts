import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { OrganizacionModule } from 'src/organizacion/organizacion.module';
import { CargoRegularModule } from 'src/cargo-regular/cargo-regular.module';
import { TipoUnidadModule } from 'src/tipo-unidad/tipo-unidad.module';
import { PersonaModule } from 'src/persona/persona.module';
import { EstudianteModule } from 'src/estudiante/estudiante.module';
import { DocenteModule } from 'src/docente/docente.module';
import { AdministrativoModule } from 'src/administrativo/administrativo.module';
import { UnidadModule } from 'src/unidad/unidad.module';
import { CargoIntermedioModule } from 'src/cargo-intermedio/cargo-intermedio.module';
import { OrganizacionPersonaModule } from 'src/organizacion-persona/organizacion-persona.module';
import { AdministrativoCargoRegularUnidadModule } from 'src/administrativo-cargo-regular-unidad/administrativo-cargo-regular-unidad.module';
import { CargoIntermedioDocenteModule } from 'src/cargo-intermedio-docente/cargo-intermedio-docente.module';
import { FacultadModule } from 'src/facultad/facultad.module';
import { CarreraModule } from 'src/carrera/carrera.module';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [
    OrganizacionModule,
    CargoRegularModule,
    TipoUnidadModule,
    PersonaModule,
    EstudianteModule,
    DocenteModule,
    AdministrativoModule,
    UnidadModule,
    CargoIntermedioModule,
    OrganizacionPersonaModule,
    AdministrativoCargoRegularUnidadModule,
    CargoIntermedioDocenteModule,
    FacultadModule,
    CarreraModule,
    UsuarioModule,
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
