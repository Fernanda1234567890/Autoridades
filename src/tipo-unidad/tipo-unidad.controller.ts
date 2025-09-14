import { Controller, Get, Post, Body, Param, Query, ParseIntPipe, Delete, UseGuards, Put } from '@nestjs/common';
import { TipoUnidadService } from './tipo-unidad.service';
import { CreateTipoUnidadDto } from './dto/create-tipo-unidad.dto';
import { UpdateTipoUnidadDto } from './dto/update-tipo-unidad.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('tipo-unidad')
export class TipoUnidadController {
  constructor(private readonly tipoUnidadService: TipoUnidadService) {}

      @UseGuards(JwtAuthGuard, RolesGuard)
      @Roles('admin')
      @Get('inactivos')
      findInactivos() {
        return this.tipoUnidadService.findAll({ estado: 'inactivo' });
      }

      @Get()
      getAll(
      @Query('page') page?: '1',
      @Query('limit') limit?: '10',
      @Query('search') search?: string,
      @Query('estado') estado: 'activo' | 'inactivo' | 'todos' = 'activo', 
      ) {
         const pageNum = isNaN(Number(page)) ? 1 : Number(page);
         const limitNum = isNaN(Number(limit)) ? 10 : Number(limit);
  
        return this.tipoUnidadService.findAll({ page: pageNum, limit: limitNum, search, estado });
      }

      //Buscar por ID
    @Get(':id')
    getOne(@Param('id') id: string) {
    return this.tipoUnidadService.findOne(+id);
    }
    //crear
  @Post()
    async create(@Body() createTipoUnidadDto: CreateTipoUnidadDto) {
      const tipoUnidad = await this.tipoUnidadService.create(createTipoUnidadDto);
      return {
        success: true,
        message: 'Tipo de unidad creada correctamente',
        data: tipoUnidad,
      };
    }

    @Get('/seed')
    seed() {
      return this.tipoUnidadService.seed();
    }

  @Get(':id')
    async findOne(@Param('id') id: string) {
      const tipoUnidad = await this.tipoUnidadService.findOne(+id);
      return { success: true, message: 'Tipo de unidad encontrado', data: tipoUnidad };
    }

    @Get('buscar/:tipo')
    async findByTipo(@Param('tipo') tipo: string) {
      const data = await this.tipoUnidadService.findByTipo(tipo);
      return { success: true, message: 'Tipo de unidad encontrado por nombre', data };
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTipoUnidadDto: UpdateTipoUnidadDto) {
      const tipoUnidad = await this.tipoUnidadService.update(+id, updateTipoUnidadDto);
      return { success: true, message: 'Tipo de unidad actualizado', data: tipoUnidad };
    }

   @Delete(':id')
      async remove(@Param('id', ParseIntPipe) id: number) {
        return this.tipoUnidadService.remove(id);
    }
}
