import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.docenteService.findAll(+page, +limit);
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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateDocenteDto) {
    return this.docenteService.update(+id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.docenteService.remove(+id);
  }

  @Patch('restore/:id')
  async restore(@Param('id') id: string) {
    return this.docenteService.restore(+id);
  }
}
