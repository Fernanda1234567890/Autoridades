import { Controller, Get, Post, Body, Put, Param, Delete, Query, ParseIntPipe, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UnidadService } from './unidad.service';
import { CreateUnidadDto } from './dto/create-unidad.dto';
import { UpdateUnidadDto } from './dto/update-unidad.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Controller('unidad')
export class UnidadController {
  constructor(private readonly unidadService: UnidadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './uploads/unidades',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @Body() createUnidadDto: CreateUnidadDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      createUnidadDto.logo = `uploads/unidades/${file.filename}`;
    }

    const unidad = await this.unidadService.create(createUnidadDto);
    return {
      success: true,
      message: 'Unidad registrada correctamente',
      data: unidad,
    };
  }
  @Get('seed') seed() {
    return this.unidadService.seed();
  }

    @Get()
  getAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('nombre') nombre?: string,
    @Query('responsable') responsable?: string,
    @Query('id_tipo_unidad') id_tipo_unidad?: number,
    @Query('estado') estado: 'activo' | 'inactivo' | 'todos' = 'activo',
  ) {
    const pageNum = isNaN(Number(page)) ? 1 : Number(page);
    const limitNum = isNaN(Number(limit)) ? 10 : Number(limit);
    return this.unidadService.findAll(pageNum, limitNum, { nombre, responsable, id_tipo_unidad, estado });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('inactivos')
  findInactivos() {
    return this.unidadService.findAll(1, 10, { estado: 'inactivo' });
  }

  @Get(':id') getOne(@Param('id', ParseIntPipe) id: number) {
    return this.unidadService.findOne(id);
  }

  @Get('buscar') search(
    @Query('nombre') nombre?: string,
    @Query('responsable') responsable?: string,
    @Query('id_tipo_unidad') id_tipo_unidad?: number,
  ) {
    return this.unidadService.search({ nombre, responsable, id_tipo_unidad });
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './uploads/unidades',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: number,
    @Body() updateUnidadDto: UpdateUnidadDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      updateUnidadDto.logo = `uploads/unidades/${file.filename}`;
    }

    const unidad = await this.unidadService.update(+id, updateUnidadDto);
    return {
      success: true,
      message: 'Unidad actualizada correctamente',
      data: unidad,
    };
  }

  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) {
    return this.unidadService.remove(id);
  }

  @Put('restore/:id') restore(@Param('id', ParseIntPipe) id: number) {
    return this.unidadService.restore(id);
  }
}
