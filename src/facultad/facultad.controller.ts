import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { FacultadService } from './facultad.service';
import { CreateFacultadDto } from './dto/create-facultad.dto';
import { UpdateFacultadDto } from './dto/update-facultad.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('facultad')
export class FacultadController {
  constructor(private readonly facultadService: FacultadService) {}

   @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get('inactivos')
    findInactivos() {
      return this.facultadService.findAll({ estado: 'inactivo' });
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
    return this.facultadService.findAll({ 
      page: pageNum, 
      limit: limitNum, 
      search, 
      estado 
    });
  }
    @Get(':id')
  getOne(@Param('id') id: number) {
    return this.facultadService.findOne(+id);
  }

  @Post()
  create(@Body() createFacultadDto: CreateFacultadDto) {
    return this.facultadService.create(createFacultadDto);
  }

  @Get('/seed')
  seed() {
    return this.facultadService.seed();
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() updateFacultadDto: UpdateFacultadDto) {
    return this.facultadService.update(+id, updateFacultadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facultadService.remove(+id);
  }

  @Put(':id/restaurar')
  restore(@Param('id') id: string) {
    return this.facultadService.restore(+id);
  }
}
