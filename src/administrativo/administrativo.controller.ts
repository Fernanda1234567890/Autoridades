import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.administrativoService.findAll(+page, +limit);
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
  update(
    @Param('id') id: string,
    @Body() updateAdministrativoDto: UpdateAdministrativoDto,
  ) {
    return this.administrativoService.update(+id, updateAdministrativoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.administrativoService.remove(+id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.administrativoService.restore(+id);
  }
}