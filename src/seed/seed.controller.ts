import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
import { OrganizacionService } from 'src/organizacion/organizacion.service';
import { CargoRegularService } from 'src/cargo-regular/cargo-regular.service';
import { TipoUnidadService } from 'src/tipo-unidad/tipo-unidad.service';
import { PersonaService } from 'src/persona/persona.service';
import { EstudianteService } from 'src/estudiante/estudiante.service';
import { DocenteService } from 'src/docente/docente.service';
import { AdministrativoService } from 'src/administrativo/administrativo.service';
import { UnidadService } from 'src/unidad/unidad.service';
import { CargoIntermedioService } from 'src/cargo-intermedio/cargo-intermedio.service';
import { OrganizacionPersonaService } from 'src/organizacion-persona/organizacion-persona.service';
import { AdministrativoCargoRegularUnidadService } from 'src/administrativo-cargo-regular-unidad/administrativo-cargo-regular-unidad.service';
import { CargoIntermedioDocenteService } from 'src/cargo-intermedio-docente/cargo-intermedio-docente.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import { FacultadService } from 'src/facultad/facultad.service';
import { CarreraService } from 'src/carrera/carrera.service';

@Controller('seed')
export class SeedController {
  constructor(
    // private readonly seedService: SeedService,
    private readonly usuarioService: UsuarioService,

    private readonly organizacionService: OrganizacionService,
    private readonly cargoRegularService: CargoRegularService,
    private readonly tipoUnidadService: TipoUnidadService,
    private readonly personaService: PersonaService,
    private readonly estudianteService: EstudianteService,
    private readonly docenteService: DocenteService,
    private readonly administrativoService: AdministrativoService,
    private readonly unidadService: UnidadService,
    private readonly cargoIntermedioService: CargoIntermedioService,

    private readonly facultadService: FacultadService,
    private readonly carreraService: CarreraService,

    private readonly organizacionPersonaService: OrganizacionPersonaService,
    private readonly administrativoCargoRegularUnidadService: AdministrativoCargoRegularUnidadService,
    private readonly cargoIntermedioDocenteService: CargoIntermedioDocenteService,



  ) { }

  @Get()
  async seed() {
    console.log('->Usuario')
    await this.usuarioService.seed()

    console.log('->organizacionService')
    await this.organizacionService.seed()
    console.log('->cargoRegularService')
    await this.cargoRegularService.seed()
    console.log('->tipoUnidadService')
    await this.tipoUnidadService.seed()
    console.log('->personaService')
    await this.personaService.seed()
    console.log('->estudianteService')
    await this.estudianteService.seed()
    console.log('->docenteService')
    await this.docenteService.seed()
    console.log('->administrativoService')
    await this.administrativoService.seed()
    console.log('->unidadService')
    await this.unidadService.seed()
    console.log('->cargoIntermedioService')
    await this.cargoIntermedioService.seed()

    console.log('->facultadService')
    await this.facultadService.seed()
    console.log('->carreraService')
    await this.carreraService.seed()

    console.log('->organizacionPersonaService')
    await this.organizacionPersonaService.seed()
    console.log('->administrativoCargoRegularUnidadService')
    await this.administrativoCargoRegularUnidadService.seed()
    console.log('->cargoIntermedioDocenteService')
    await this.cargoIntermedioDocenteService.seed()

    return 'listo....'
    // return this.seedService.findAll();
  }

}
