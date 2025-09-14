import { Controller, Get, Post, Body, Put, Param, Query, Delete } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { QueryPersonaDto } from './dto/query-persona.dto';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

   // Listar con paginación y filtros
 // ✅ Endpoint unificado para todas las búsquedas
  @Get()
  async findAll(@Query() query: QueryPersonaDto) {
    const result = await this.personaService.findAll(query);
    
    return {
      success: true,
      message: 'Lista de personas obtenida correctamente',
      ...result,
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

  @Get('/seed')
  seed() {
    return this.personaService.seed();
  }
 
// Actualizar
  @Put(':id')
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