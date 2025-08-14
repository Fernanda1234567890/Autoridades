import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CargoRegularService } from './cargo-regular.service';
import { CreateCargoRegularDto } from './dto/create-cargo-regular.dto';
import { UpdateCargoRegularDto } from './dto/update-cargo-regular.dto';

@Controller('cargo-regular')
export class CargoRegularController {
  constructor(private readonly cargoRegularService: CargoRegularService) {}

  @Post()
  create(@Body() createCargoRegularDto: CreateCargoRegularDto) {
    return this.cargoRegularService.create(createCargoRegularDto);
  }

  @Get()
  findAll() {
    return this.cargoRegularService.findAll();
  }

  @Get('/seed')
  seed() {
    return this.cargoRegularService.seed();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cargoRegularService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCargoRegularDto: UpdateCargoRegularDto) {
    return this.cargoRegularService.update(+id, updateCargoRegularDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cargoRegularService.remove(+id);
  }
}
