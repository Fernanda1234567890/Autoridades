import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';



@Controller('carrera')
export class CarreraController {
  constructor(private readonly carreraService: CarreraService) {}

  @Post()
  create(@Body() createCarreraDto: CreateCarreraDto) {
    return this.carreraService.create(createCarreraDto);
  }

  @Get()
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search?: string,
    @Query('estado') estado?: string,
  ) {
    const pageNum = isNaN(Number(page)) ? 1 : Number(page);
    const limitNum = isNaN(Number(limit)) ? 10 : Number(limit);

    // Normalizamos estado
    let estadoNormalized: 'activo' | 'inactivo' | 'todos' | undefined = 'activo';
    if (estado === 'inactivo') estadoNormalized = 'inactivo';
    else if (estado === 'todos') estadoNormalized = 'todos';

    return this.carreraService.findAll({ 
      page: pageNum,
      limit: limitNum,
      search,
      estado: estadoNormalized,
    });
  }


  @Get('/seed')
  seed() {
    return this.carreraService.seed();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carreraService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCarreraDto: UpdateCarreraDto) {
    return this.carreraService.update(+id, updateCarreraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carreraService.remove(+id);
  }
}
