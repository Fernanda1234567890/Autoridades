import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AdministrativoService } from './administrativo.service';
import { CreateAdministrativoDto } from './dto/create-administrativo.dto';
import { UpdateAdministrativoDto } from './dto/update-administrativo.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('administrativo')
export class AdministrativoController {
  constructor(private readonly administrativoService: AdministrativoService) {}

  // ✅ Solo admin puede ver inactivos
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('inactivos')
  findInactivos(){
    return this.administrativoService.findAll({ estado: 'inactivo' });
  }

  // ✅ Listado general con paginación, búsqueda y filtro por estado
  @Get()
  getAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('estado') estado: 'activo' | 'inactivo' | 'todos' = 'activo'
  ) {
    const pageNum = isNaN(Number(page)) ? 1 : Number(page);
    const limitNum = isNaN(Number(limit)) ? 10 : Number(limit);
    return this.administrativoService.findAll({ page: pageNum, limit: limitNum, search, estado });
  }

  // ✅ Buscar por ID
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.administrativoService.findOne(id);
  }

  // ✅ Crear administrativo
  @Post()
  create(@Body() createAdministrativoDto: CreateAdministrativoDto) {
    return this.administrativoService.create(createAdministrativoDto);
  }

  // ✅ Seeder
  @Get('/seed')
  seed() {
    return this.administrativoService.seed();
  }

  // ✅ Actualizar
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAdministrativoDto: UpdateAdministrativoDto) {
    return this.administrativoService.update(id, updateAdministrativoDto);
  }

  // ✅ Soft delete
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.administrativoService.remove(id);
  }

  // ✅ Restaurar administrativo
  @Patch(':id/restaurar')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.administrativoService.restore(id);
  }
}
