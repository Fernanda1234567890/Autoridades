import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IntermediatePositionService } from './intermediate-position.service';
import { CreateIntermediatePositionDto } from './dto/create-intermediate-position.dto';
import { UpdateIntermediatePositionDto } from './dto/update-intermediate-position.dto';

@Controller('intermediate-position')
export class IntermediatePositionController {
  constructor(private readonly intermediatePositionService: IntermediatePositionService) {}

  @Post()
  create(@Body() createIntermediatePositionDto: CreateIntermediatePositionDto) {
    return this.intermediatePositionService.create(createIntermediatePositionDto);
  }

  @Get()
  findAll() {
    return this.intermediatePositionService.findAll();
  }

     @Get('/seed')
  seedUnits() {
    return this.intermediatePositionService.seed();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.intermediatePositionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIntermediatePositionDto: UpdateIntermediatePositionDto) {
    return this.intermediatePositionService.update(id, updateIntermediatePositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.intermediatePositionService.remove(id);
  }
}
