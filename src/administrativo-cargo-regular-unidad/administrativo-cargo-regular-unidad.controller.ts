import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AdministrativoCargoRegularUnidadService } from './administrativo-cargo-regular-unidad.service';
import { CreateAdministrativoCargoRegularUnidadDto } from './dto/create-administrativo-cargo-regular-unidad.dto';
import { UpdateAdministrativoCargoRegularUnidadDto } from './dto/update-administrativo-cargo-regular-unidad.dto';

@Controller('administrativo-cargo-regular-unidad')
export class AdministrativoCargoRegularUnidadController {
  constructor(private readonly service: AdministrativoCargoRegularUnidadService) {}

  @Post()
  create(@Body() dto: CreateAdministrativoCargoRegularUnidadDto) {
    return this.service.create(dto);
  }
  @Get()
  async findAll() {
    const data = await this.service.findAll();
    return {
      data,          
      total: data.length,  
    };
  }

  @Get('/seed')
  seed() {
    return this.service.seed();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAdministrativoCargoRegularUnidadDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}