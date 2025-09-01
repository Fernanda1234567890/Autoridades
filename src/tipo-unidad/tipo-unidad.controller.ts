import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { TipoUnidadService } from './tipo-unidad.service';
import { CreateTipoUnidadDto } from './dto/create-tipo-unidad.dto';
import { UpdateTipoUnidadDto } from './dto/update-tipo-unidad.dto';

@Controller('tipo-unidad')
export class TipoUnidadController {
  constructor(private readonly tipoUnidadService: TipoUnidadService) {}

 @Post()
  async create(@Body() createTipoUnidadDto: CreateTipoUnidadDto) {
    const tipoUnidad = await this.tipoUnidadService.create(createTipoUnidadDto);
    return {
      success: true,
      message: 'Tipo de unidad creada correctamente',
      data: tipoUnidad,
    };
  }

@Get()
  async findAll() {
    const data = await this.tipoUnidadService.findAll();
    return { success: true, message: 'Lista de tipos de unidad', data };
  }

  @Get('/seed')
  seed() {
    return this.tipoUnidadService.seed();
  }

@Get(':id')
  async findOne(@Param('id') id: string) {
    const tipoUnidad = await this.tipoUnidadService.findOne(+id);
    return { success: true, message: 'Tipo de unidad encontrado', data: tipoUnidad };
  }

  @Get('buscar/:tipo')
  async findByTipo(@Param('tipo') tipo: string) {
    const data = await this.tipoUnidadService.findByTipo(tipo);
    return { success: true, message: 'Tipo de unidad encontrado por nombre', data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTipoUnidadDto: UpdateTipoUnidadDto) {
    const tipoUnidad = await this.tipoUnidadService.update(+id, updateTipoUnidadDto);
    return { success: true, message: 'Tipo de unidad actualizado', data: tipoUnidad };
  }
}
