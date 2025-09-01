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
  async findOne(@Param('id') id: string) {
    const administrativo = await this.administrativoService.findOne(+id);
    return { success: true, message: 'Administrativo encontrado', data: administrativo };
  }

  @Get('buscar')
  async search(
    @Query('nombre') nombre?: string,
    @Query('apellido') apellido?: string,
    @Query('ci') ci?: string,
  ) {
    return this.administrativoService.search({ nombre, apellido, ci });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateAdministrativoDto) {
    return this.administrativoService.update(+id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.administrativoService.remove(+id);
  }

  @Patch('restore/:id')
  async restore(@Param('id') id: string) {
    return this.administrativoService.restore(+id);
  }
}
