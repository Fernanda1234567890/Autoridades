import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findAll() {
    return this.cargoIntermedioService.findAll();
  }

    @Get('/seed')
  seed() {
    return this.cargoIntermedioService.seed();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cargoIntermedioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCargoIntermedioDto: UpdateCargoIntermedioDto) {
    return this.cargoIntermedioService.update(+id, updateCargoIntermedioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cargoIntermedioService.remove(+id);
  }
}
