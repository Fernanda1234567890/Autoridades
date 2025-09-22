import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { CargoIntermedioService } from './cargo-intermedio.service';
import { CreateCargoIntermedioDto } from './dto/create-cargo-intermedio.dto';
import { UpdateCargoIntermedioDto } from './dto/update-cargo-intermedio.dto';

@Controller('cargo-intermedio')
export class CargoIntermedioController {
  constructor(private readonly cargoIntermedioService: CargoIntermedioService) {}

  @Post()
  create(@Body() createCargoIntermedioDto: CreateCargoIntermedioDto) {
    return this.cargoIntermedioService.create(createCargoIntermedioDto);
  }

   @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.cargoIntermedioService.findAll(+page, +limit);
  }

  //   @Get('/seed')
  // seed() {
  //   return this.cargoIntermedioService.seed();
  // }

   @Get('buscar/:nombre')
  findByName(@Param('nombre') nombre: string) {
    return this.cargoIntermedioService.findByName(nombre);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cargoIntermedioService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCargoIntermedioDto: UpdateCargoIntermedioDto) {
    return this.cargoIntermedioService.update(+id, updateCargoIntermedioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
  return this.cargoIntermedioService.remove(id);
}

}