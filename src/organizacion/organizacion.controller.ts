import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { OrganizacionService } from './organizacion.service';
import { CreateOrganizacionDto } from './dto/create-organizacion.dto';
import { UpdateOrganizacionDto } from './dto/update-organizacion.dto';

@Controller('organizacion')
export class OrganizacionController {
  constructor(private readonly organizacionService: OrganizacionService) {}

  // 📌 Crear organización
  @Post()
  async create(@Body() createOrganizacionDto: CreateOrganizacionDto) {
    const organizacion = await this.organizacionService.create(createOrganizacionDto);
    return {
      success: true,
      message: 'Organización creada correctamente',
      data: organizacion,
    };
  }
  // 📌 Listar todas con paginación y filtro opcional
  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    // @Query('tipo') tipo?: string,
  ) {
    const result = await this.organizacionService.findAll();
    return {
      success: true,
      data: result.items,
      total: result.total,
      page: +page,
      limit: +limit,
    };
  }
  
  @Get('/seed')
  seed() {
    return this.organizacionService.seed();
  }

  // 📌 Buscar por id
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const organizacion = await this.organizacionService.findOne(+id);
    if (!organizacion) {
      throw new NotFoundException(`La organización con id ${id} no existe`);
    }
    return {
      success: true,
      data: organizacion,
    };
  }
  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateOrganizacionDto: UpdateOrganizacionDto) {
  //   return this.organizacionService.update(+id, updateOrganizacionDto);
  // }

  // 📌 Actualizar organización
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateOrganizacionDto) {
    const organizacion = await this.organizacionService.update(+id, dto);
    if (!organizacion) {
      throw new NotFoundException(`No se pudo actualizar, id ${id} no existe`);
    }
    return {
      success: true,
      message: 'Organización actualizada correctamente',
      data: organizacion,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.organizacionService.remove(+id);
  }
}
