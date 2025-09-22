
import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
//import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Usuario } from 'src/usuario/entities/usuario.entity';


@Controller('actividad')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

@UseGuards(JwtAuthGuard)
@Get('mias')
async listarMias(@Req() req: any) {  // usar any para evitar errores TS
  const usuario = req.user;
  return this.actividadService.listarActividades(usuario.id);
}


  @Get()
  async findAll() {
    return this.actividadService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.actividadService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateActividadDto) {
    return this.actividadService.create(dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.actividadService.remove(id);
  }
}