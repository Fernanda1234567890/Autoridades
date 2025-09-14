import { Controller, Get, Post, Body, Param, Delete, Query, ParseIntPipe, UseGuards, Put } from '@nestjs/common';
import { OrganizacionService } from './organizacion.service';
import { CreateOrganizacionDto } from './dto/create-organizacion.dto';
import { UpdateOrganizacionDto } from './dto/update-organizacion.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('organizacion')
export class OrganizacionController {
  constructor(private readonly organizacionService: OrganizacionService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('inactivos')
  findInactivos() {
    return this.organizacionService.findAll({ estado: 'inactivo' });
  }

  @Get()
  getAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('estado') estado: 'activo' | 'inactivo' | 'todos' = 'activo',
  ) {
    const pageNum = isNaN(Number(page)) ? 1 : Number(page);
    const limitNum = isNaN(Number(limit)) ? 10 : Number(limit);
    return this.organizacionService.findAll({ 
      page: pageNum, 
      limit: limitNum, 
      search, 
      estado 
    });
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.organizacionService.findOne(+id);
  }

  @Post()
  create(@Body() createOrganizacionDto: CreateOrganizacionDto) {
    return this.organizacionService.create(createOrganizacionDto);
  }

  @Get('/seed')
  seed() {
    return this.organizacionService.seed();
  }

  @Put(':id')
  updatePut(@Param('id') id: string, @Body() updateOrganizacionDto: UpdateOrganizacionDto) {
    return this.organizacionService.update(+id, updateOrganizacionDto);
  }


  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.organizacionService.remove(id);
  }

  @Put(':id/restaurar')
  restore(@Param('id') id: string) {
    return this.organizacionService.restore(+id);
  }
}