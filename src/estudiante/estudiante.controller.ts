import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

 
  @Post()
  create(@Body() createEstudianteDto: CreateEstudianteDto) {
    return this.estudianteService.create(createEstudianteDto);
  }

  // ✅ Listar con paginación, búsqueda y estado
  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
    @Query('estado') estado: 'activo' | 'inactivo' | 'todos' = 'activo',
  ) {
    return this.estudianteService.findAll({
      page: +page,
      limit: +limit,
      search,
      estado,
    });
  }
  @Get('/seed')
  seed() {
    return this.estudianteService.seed();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudianteService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstudianteDto: UpdateEstudianteDto,
  ) {
    return this.estudianteService.update(+id, updateEstudianteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudianteService.remove(+id);
  }

  @Put('restore/:id')
  restore(@Param('id') id: string) {
    return this.estudianteService.restore(+id);
  }
}