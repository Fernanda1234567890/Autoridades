import { Controller, Get, Post, Body, Patch, Param, Query, Delete } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  // Crear persona
  @Post()
  async create(@Body() createPersonaDto: CreatePersonaDto) {
    const persona = await this.personaService.create(createPersonaDto);
    return {
      success: true,
      message: 'Persona creada correctamente',
      data: persona,
    };
  }

  // Listar con paginación y filtros
  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('nombre') nombre?: string,
    @Query('apellido') apellido?: string,
    @Query('ci') ci?: string,
    @Query('estado') estado?: 'activo' | 'inactivo' | 'todos'

  ) {
    const result = await this.personaService.findAll(Number(page) || 1, Number(limit) || 10, nombre, apellido, ci, estado);
    return {
      success: true,
      message: 'Lista de personas obtenida correctamente',
      ...result,
    };
  }

  @Get('/seed')
  seed() {
    return this.personaService.seed();
  }

 // Buscar por nombre o filtros
@Get('/search/filtros')
async search(@Query() query: any) {
  const personas = await this.personaService.search(query);
  return {
    success: true,
    message: 'Resultados de búsqueda',
    ...personas, // esto ya devuelve { data, total }
  };
}
 

// Buscar por ID
@Get(':id')
async findOne(@Param('id') id: number) {
  const persona = await this.personaService.findOne(+id);
  return {
    success: true,
    message: 'Persona encontrada',
    data: persona,
  };
}


// Actualizar
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updatePersonaDto: UpdatePersonaDto) {
    const persona = await this.personaService.update(+id, updatePersonaDto);
    return {
      success: true,
      message: 'Persona actualizada correctamente',
      data: persona,
    };
  }

  // Eliminar
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.personaService.remove(+id);
    return {
      success: true,
      message: 'Persona eliminada correctamente',
    };
  }
}