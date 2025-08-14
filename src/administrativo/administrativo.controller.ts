import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdministrativoService } from './administrativo.service';
import { CreateAdministrativoDto } from './dto/create-administrativo.dto';
import { UpdateAdministrativoDto } from './dto/update-administrativo.dto';

@Controller('administrativo')
export class AdministrativoController {
  constructor(private readonly administrativoService: AdministrativoService) {}

  @Post()
  create(@Body() createAdministrativoDto: CreateAdministrativoDto) {
    return this.administrativoService.create(createAdministrativoDto);
  }

  @Get()
  findAll() {
    return this.administrativoService.findAll();
  }

   @Get('/seed')
  seed() {
    return this.administrativoService.seed();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administrativoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdministrativoDto: UpdateAdministrativoDto) {
    return this.administrativoService.update(+id, updateAdministrativoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.administrativoService.remove(+id);
  }
}
