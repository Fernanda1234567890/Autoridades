import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CargoIntermedioDocenteService } from './cargo-intermedio-docente.service';
import { CreateCargoIntermedioDocenteDto } from './dto/create-cargo-intermedio-docente.dto';
import { UpdateCargoIntermedioDocenteDto } from './dto/update-cargo-intermedio-docente.dto';

@Controller('cargo-intermedio-docente')
export class CargoIntermedioDocenteController {
  constructor(private readonly service: CargoIntermedioDocenteService) {}

  @Post()
  create(@Body() dto: CreateCargoIntermedioDocenteDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  // @Get('docente/:id')
  // findByDocente(@Param('id', ParseIntPipe) id: number) {
  //   return this.service.findByDocente(id);
  // }

  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.service.findOne(id);
  // }

  // @Put(':id')
  // update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCargoIntermedioDocenteDto) {
  //   return this.service.update(id, dto);
  // }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.service.remove(id);
  // }

  // @Get('seed')
  // seed() {
  //   return this.service.seed();
  // }
}
