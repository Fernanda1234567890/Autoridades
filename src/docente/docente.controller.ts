import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { DocenteService } from './docente.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';

@Controller('docente')
export class DocenteController {
  constructor(private readonly docenteService: DocenteService) {}

  @Post()
  create(@Body() createDocenteDto: CreateDocenteDto) {
    return this.docenteService.create(createDocenteDto);
  }

  @Get()
  getAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.docenteService.findAll({ page: +page, limit: +limit });
  }

 @Get()
  findAll(@Query() query: any) {
    return this.docenteService.findAll(query);
  }

 @Get('/seed')
  seed() {
    return this.docenteService.seed();
  }
  
 @Get(':id')
  async findOne(@Param('id') id: string) {
    const docente = await this.docenteService.findOne(+id);
    return { success: true, message: 'Docente encontrado', data: docente };
  }

  @Get('buscar')
  async search(
    @Query('nombre') nombre?: string,
    @Query('apellido') apellido?: string,
    @Query('ci') ci?: string,
  ) {
    return this.docenteService.search({ nombre, apellido, ci });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateDocenteDto) {
    return this.docenteService.update(+id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.docenteService.remove(+id);
  }

  @Put('restore/:id')
  async restore(@Param('id') id: string) {
    return this.docenteService.restore(+id);
  }
}