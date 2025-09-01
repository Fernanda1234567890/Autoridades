import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UnidadService } from './unidad.service';
import { CreateUnidadDto } from './dto/create-unidad.dto';
import { UpdateUnidadDto } from './dto/update-unidad.dto';

@Controller('unidad')
export class UnidadController {
  constructor(private readonly unidadService: UnidadService) {}

  @Post()
  create(@Body() createUnidadDto: CreateUnidadDto) {
    return this.unidadService.create(createUnidadDto);
  }

  // Listar unidades con paginación
  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.unidadService.findAll(+page, +limit);
  }
  @Get('/seed')
  seed() {
    return this.unidadService.seed();
  }

  // Buscar por ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.unidadService.findOne(+id);
  }

  // Búsqueda dinámica
  @Get('/buscar')
  async search(
    @Query('nombre') nombre?: string,
    @Query('responsable') responsable?: string,
    @Query('id_tipo_unidad') id_tipo_unidad?: number,
  ) {
    return this.unidadService.search({ nombre, responsable, id_tipo_unidad });
  }

  // Actualizar
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUnidadDto: UpdateUnidadDto,
  ) {
    return this.unidadService.update(+id, updateUnidadDto);
  }

  // Soft delete → desactivar
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.unidadService.remove(+id);
  }

  // Restaurar → activar
  @Patch('restore/:id')
  async restore(@Param('id') id: string) {
    return this.unidadService.restore(+id);
  }
}