import { Controller, Get, Post, Body, Put, Param, Query, Delete, NotFoundException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from "express"; 

import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { QueryPersonaDto } from './dto/query-persona.dto';
import { Persona } from './entities/persona.entity';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Get()
  async findAll(@Query() query: QueryPersonaDto) {
    const result = await this.personaService.findAll(query);
    
    return {
      success: true,
      message: 'Lista de personas obtenida correctamente',
      ...result,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const persona = await this.personaService.findOne(+id);
    return {
      success: true,
      message: 'Persona encontrada',
      data: persona,
    };
  }

    @Get('ci/:ci')
    async getByCI(@Param('ci') ci: string) {
      const persona = await this.personaService.findByCI(ci);
      if (!persona) {
        throw new NotFoundException(`Persona con CI ${ci} no encontrada`);
      }
      return {
        success: true,
        message: 'Persona encontrada',
        data: persona,
      };
    }

  @Post()
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './uploads/personas',
        filename: (req, file, cb) => {
          const uniqueName =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )

  async create(
    @Body() createPersonaDto: CreatePersonaDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createPersonaDto.img = `uploads/personas/${file.filename}`;
    }

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

 
 
  @Put(':id')
  async update(@Param('id') id: number, @Body() updatePersonaDto: UpdatePersonaDto) {
    const persona = await this.personaService.update(+id, updatePersonaDto);
    return {
      success: true,
      message: 'Persona actualizada correctamente',
      data: persona,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.personaService.remove(+id);
    return {
      success: true,
      message: 'Persona eliminada correctamente',
    };
  }
}