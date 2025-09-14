import { Controller, Get, Post, Body, Param, Query, Delete, Put } from '@nestjs/common';
import { CargoRegularService, FindAllOptions } from './cargo-regular.service';
import { CreateCargoRegularDto } from './dto/create-cargo-regular.dto';
import { UpdateCargoRegularDto } from './dto/update-cargo-regular.dto';

@Controller('cargo-regular')
export class CargoRegularController {
  constructor(private readonly cargoRegularService: CargoRegularService) {}

   @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('estado') estado?: 'activo' | 'inactivo' | 'todos'
  ) {
  const options: FindAllOptions = {
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 10,
    search,
    estado: estado ?? 'activo',
  };
  return this.cargoRegularService.findAll(options);
}

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.cargoRegularService.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateCargoRegularDto) {
    return this.cargoRegularService.create(dto);
  }
  
  @Get('/seed')
  seed() {
    return this.cargoRegularService.seed();
  }

// Buscar por ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const cargo = await this.cargoRegularService.findOne(id);
    return {
      success: true,
      message: 'Cargo regular encontrado',
      data: cargo,
    };
  }

// Buscar por nombre
  @Get('search/:nombre')
  async findByNombre(@Param('nombre') nombre: string) {
    const cargos = await this.cargoRegularService.findByName(nombre);
    return {
      success: true,
      message: 'Búsqueda de cargos regulares por nombre',
      data: cargos,
    };
  }

// Actualizar
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateCargoRegularDto) {
    return this.cargoRegularService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cargoRegularService.remove(+id);
  }

  @Put(':id/restaurar')
  restore(@Param('id') id: number) {
    return this.cargoRegularService.restore(+id);
  }
}