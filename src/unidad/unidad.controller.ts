import { Controller, Get, Post, Body, Put, Param, Delete, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UnidadService } from './unidad.service';
import { CreateUnidadDto } from './dto/create-unidad.dto';
import { UpdateUnidadDto } from './dto/update-unidad.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('unidad')
export class UnidadController {
  constructor(private readonly unidadService: UnidadService) {}

  // ✅ Crear unidad
// Listar unidades inactivas (solo admin)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Get('inactivos')
findInactivos() {
  const page = 1;
  const limit = 10;
  const filtros = { estado: 'inactivo' as 'inactivo'};
  return this.unidadService.findAll(page, limit, filtros);
}

  // ✅ Listar unidades con paginación, búsqueda y estado
  @Get()
  getAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('nombre') nombre?: string,
    @Query('responsable') responsable?: string,
    @Query('id_tipo_unidad') id_tipo_unidad?: number,
    @Query('estado') estado: 'activo' | 'inactivo' | 'todos' = 'activo',
  ) {
    const pageNum = isNaN(Number(page)) ? 1 : Number(page);
    const limitNum = isNaN(Number(limit)) ? 10 : Number(limit);

    return this.unidadService.findAll(pageNum, limitNum, {
      nombre,
      responsable,
      id_tipo_unidad,
      estado,
    });
  }


  // Buscar por ID
    @Get(':id')
    getOne(@Param('id') id: string) {
    return this.unidadService.findOne(+id);
    }

    // Crear
        @Post()
        create(@Body() createOrganizacionDto: CreateUnidadDto) {
        return this.unidadService.create(createOrganizacionDto);
        }

  // ✅ Endpoint de seed
  @Get('seed')
  seed() {
    return this.unidadService.seed();
  }

  // ✅ Búsqueda dinámica
  @Get('buscar')
  search(
    @Query('nombre') nombre?: string,
    @Query('responsable') responsable?: string,
    @Query('id_tipo_unidad') id_tipo_unidad?: number,
  ) {
    return this.unidadService.search({ nombre, responsable, id_tipo_unidad });
  }

  // ✅ Actualizar unidad
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUnidadDto: UpdateUnidadDto,
  ) {
    return this.unidadService.update(id, updateUnidadDto);
  }

  // ✅ Soft delete → desactivar unidad
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.unidadService.remove(id);
  }

  // ✅ Restaurar unidad
  @Put('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.unidadService.restore(id);
  }
}
