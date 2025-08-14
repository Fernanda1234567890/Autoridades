import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CargoIntermedioDocenteService } from './cargo-intermedio-docente.service';
import { CreateCargoIntermedioDocenteDto } from './dto/create-cargo-intermedio-docente.dto';
import { UpdateCargoIntermedioDocenteDto } from './dto/update-cargo-intermedio-docente.dto';

@Controller('cargo-intermedio-docente')
export class CargoIntermedioDocenteController {
  constructor(private readonly cargoIntermedioDocenteService: CargoIntermedioDocenteService) {}

  @Post()
  create(@Body() createCargoIntermedioDocenteDto: CreateCargoIntermedioDocenteDto) {
    return this.cargoIntermedioDocenteService.create(createCargoIntermedioDocenteDto);
  }

  @Get()
  findAll() {
    return this.cargoIntermedioDocenteService.findAll();
  }

    @Get('/seed')
  seed() {
    return this.cargoIntermedioDocenteService.seed();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cargoIntermedioDocenteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCargoIntermedioDocenteDto: UpdateCargoIntermedioDocenteDto) {
    return this.cargoIntermedioDocenteService.update(+id, updateCargoIntermedioDocenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cargoIntermedioDocenteService.remove(+id);
  }
}
