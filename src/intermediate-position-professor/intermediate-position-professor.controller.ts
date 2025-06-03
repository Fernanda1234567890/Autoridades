import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IntermediatePositionProfessorService } from './intermediate-position-professor.service';
import { CreateIntermediatePositionProfessorDto } from './dto/create-intermediate-position-professor.dto';
import { UpdateIntermediatePositionProfessorDto } from './dto/update-intermediate-position-professor.dto';

@Controller('intermediate-position-professor')
export class IntermediatePositionProfessorController {
  constructor(private readonly intermediatePositionProfessorService: IntermediatePositionProfessorService) {}

  @Post()
  create(@Body() createIntermediatePositionProfessorDto: CreateIntermediatePositionProfessorDto) {
    return this.intermediatePositionProfessorService.create(createIntermediatePositionProfessorDto);
  }

  @Get()
  findAll() {
    return this.intermediatePositionProfessorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.intermediatePositionProfessorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIntermediatePositionProfessorDto: UpdateIntermediatePositionProfessorDto) {
    return this.intermediatePositionProfessorService.update(+id, updateIntermediatePositionProfessorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.intermediatePositionProfessorService.remove(+id);
  }
}
