import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { CargoRegularService } from './cargo-regular.service';
import { CreateCargoRegularDto } from './dto/create-cargo-regular.dto';
import { UpdateCargoRegularDto } from './dto/update-cargo-regular.dto';

@Controller('cargo-regular')
export class CargoRegularController {
  constructor(private readonly cargoRegularService: CargoRegularService) {}

    @Get()
    getAll(
    @Query('page') page?: '1',
    @Query('limit') limit?: '10',
    @Query('search') search?: string,
    
    ) {
       const pageNum = isNaN(Number(page)) ? 1 : Number(page);
       const limitNum = isNaN(Number(limit)) ? 10 : Number(limit);

      return this.cargoRegularService.findAll({ page: pageNum, limit: limitNum, search});
    }
@Get(':id')
    getOne(@Param('id') id: string) {
    return this.cargoRegularService.findOne(+id);
    }
    
  // Crear
  @Post()
  create(@Body() createCargoRegularDto: CreateCargoRegularDto) {
    return this.cargoRegularService.create(createCargoRegularDto);
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
  //   @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.service.remove(id);
  // }
}