import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { CargoRegularService } from './cargo-regular.service';
import { CreateCargoRegularDto } from './dto/create-cargo-regular.dto';
import { UpdateCargoRegularDto } from './dto/update-cargo-regular.dto';

@Controller('cargo-regular')
export class CargoRegularController {
  constructor(private readonly cargoRegularService: CargoRegularService) {}

  // Crear
  @Post()
  async create(@Body() createCargoRegularDto: CreateCargoRegularDto) {
    const cargo = await this.cargoRegularService.create(createCargoRegularDto);
    return {
      success: true,
      message: 'Cargo regular creado correctamente',
      data: cargo,
    };
  }

  // Listar con paginación
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const cargos = await this.cargoRegularService.findAll(page, limit);
    return {
      success: true,
      message: 'Lista de cargos regulares obtenida correctamente',
      data: cargos,
    };
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
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCargoRegularDto: UpdateCargoRegularDto,
  ) {
    const updated = await this.cargoRegularService.update(
      id,
      updateCargoRegularDto,
    );
    return {
      success: true,
      message: 'Cargo regular actualizado correctamente',
      data: updated,
    };
  }
}