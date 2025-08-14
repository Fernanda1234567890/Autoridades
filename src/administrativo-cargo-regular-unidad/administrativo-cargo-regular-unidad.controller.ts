import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdministrativoCargoRegularUnidadService } from './administrativo-cargo-regular-unidad.service';
import { CreateAdministrativoCargoRegularUnidadDto } from './dto/create-administrativo-cargo-regular-unidad.dto';
import { UpdateAdministrativoCargoRegularUnidadDto } from './dto/update-administrativo-cargo-regular-unidad.dto';

@Controller('administrativo-cargo-regular-unidad')
export class AdministrativoCargoRegularUnidadController {
  constructor(private readonly administrativoCargoRegularUnidadService: AdministrativoCargoRegularUnidadService) {}

  @Post()
  create(@Body() createAdministrativoCargoRegularUnidadDto: CreateAdministrativoCargoRegularUnidadDto) {
    return this.administrativoCargoRegularUnidadService.create(createAdministrativoCargoRegularUnidadDto);
  }

  @Get()
  findAll() {
    return this.administrativoCargoRegularUnidadService.findAll();
  }
  @Get('/seed')
  seed() {
    return this.administrativoCargoRegularUnidadService.seed();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administrativoCargoRegularUnidadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdministrativoCargoRegularUnidadDto: UpdateAdministrativoCargoRegularUnidadDto) {
    return this.administrativoCargoRegularUnidadService.update(+id, updateAdministrativoCargoRegularUnidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.administrativoCargoRegularUnidadService.remove(+id);
  }
}
