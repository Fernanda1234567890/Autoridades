import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizacionPersonaService } from './organizacion-persona.service';
import { CreateOrganizacionPersonaDto } from './dto/create-organizacion-persona.dto';
import { UpdateOrganizacionPersonaDto } from './dto/update-organizacion-persona.dto';

@Controller('organizacion-persona')
export class OrganizacionPersonaController {
  constructor(private readonly organizacionPersonaService: OrganizacionPersonaService) {}

  @Post()
  create(@Body() createOrganizacionPersonaDto: CreateOrganizacionPersonaDto) {
    return this.organizacionPersonaService.create(createOrganizacionPersonaDto);
  }

  @Get()
  findAll() {
    return this.organizacionPersonaService.findAll();
  }

   @Get('/seed')
  seed() {
    return this.organizacionPersonaService.seed();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizacionPersonaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizacionPersonaDto: UpdateOrganizacionPersonaDto) {
    return this.organizacionPersonaService.update(+id, updateOrganizacionPersonaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizacionPersonaService.remove(+id);
  }
}
