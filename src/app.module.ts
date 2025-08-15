import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizacionModule } from './organizacion/organizacion.module';
import { CargoRegularModule } from './cargo-regular/cargo-regular.module';
import { TipoUnidadModule } from './tipo-unidad/tipo-unidad.module';
import { PersonaModule } from './persona/persona.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { DocenteModule } from './docente/docente.module';
import { AdministrativoModule } from './administrativo/administrativo.module';
import { UnidadModule } from './unidad/unidad.module';
import { CargoIntermedioModule } from './cargo-intermedio/cargo-intermedio.module';
import { OrganizacionPersonaModule } from './organizacion-persona/organizacion-persona.module';
import { AdministrativoCargoRegularUnidadModule } from './administrativo-cargo-regular-unidad/administrativo-cargo-regular-unidad.module';
import { CargoIntermedioDocenteModule } from './cargo-intermedio-docente/cargo-intermedio-docente.module';
import { Organizacion } from './organizacion/entities/organizacion.entity';
import { CargoRegular } from './cargo-regular/entities/cargo-regular.entity';
import { TipoUnidad } from './tipo-unidad/entities/tipo-unidad.entity';
import { Persona } from './persona/entities/persona.entity';
import { Estudiante } from './estudiante/entities/estudiante.entity';
import { Docente } from './docente/entities/docente.entity';
import { AdministrativoCargoRegularUnidad } from './administrativo-cargo-regular-unidad/entities/administrativo-cargo-regular-unidad.entity';
import { Administrativo } from './administrativo/entities/administrativo.entity';
import { Unidad } from './unidad/entities/unidad.entity';
import { CargoIntermedio } from './cargo-intermedio/entities/cargo-intermedio.entity';
import { OrganizacionPersona } from './organizacion-persona/entities/organizacion-persona.entity';
//import { AdministrativoCargoRegularUnidadService } from './administrativo-cargo-regular-unidad/administrativo-cargo-regular-unidad.service';
import { CargoIntermedioDocente } from './cargo-intermedio-docente/entities/cargo-intermedio-docente.entity';
import { SeedModule } from './seed/seed.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456789',
      database: 'uatf_autoridades',
      
      entities: [ 
        Organizacion,
        CargoRegular,
        TipoUnidad,
        Persona,
        Estudiante,
        Docente,
        Administrativo,
        Unidad,
        CargoIntermedio,
        OrganizacionPersona,
        AdministrativoCargoRegularUnidad,
        CargoIntermedioDocente
      ],
      synchronize: true,
    }),
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
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
