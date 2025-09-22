import { Controller, Get, Post, Body, Put, Param, Delete, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AdministrativoService } from './administrativo.service';
import { CreateAdministrativoDto } from './dto/create-administrativo.dto';
import { UpdateAdministrativoDto } from './dto/update-administrativo.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('administrativo')
export class AdministrativoController {
  constructor(private readonly administrativoService: AdministrativoService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('inactivos')
  findInactivos(){
    return this.administrativoService.findAll({ estado: 'inactivo' });
  }

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

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.administrativoService.findOne(id);
  }

  @Post()
  create(@Body() createAdministrativoDto: CreateAdministrativoDto) {
    return this.administrativoService.create(createAdministrativoDto);
  }

  @Get('/seed')
  seed() {
    return this.administrativoService.seed();
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAdministrativoDto: UpdateAdministrativoDto) {
    return this.administrativoService.update(id, updateAdministrativoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.administrativoService.remove(id);
  }

  @Put(':id/restaurar')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.administrativoService.restore(id);
  }
}
