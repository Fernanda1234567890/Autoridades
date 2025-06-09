import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegularPositionService } from './regular-position.service';
import { CreateRegularPositionDto } from './dto/create-regular-position.dto';
import { UpdateRegularPositionDto } from './dto/update-regular-position.dto';

@Controller('regular-position')
export class RegularPositionController {
  constructor(private readonly regularPositionService: RegularPositionService) {}

  @Post()
  create(@Body() createRegularPositionDto: CreateRegularPositionDto) {
    return this.regularPositionService.create(createRegularPositionDto);
  }

  @Get()
  findAll() {
    return this.regularPositionService.findAll();
  }

  @Get('/seed')
  seedPositions() {
    return this.regularPositionService.seed();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regularPositionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateRegularPositionDto: UpdateRegularPositionDto
  ) {
    return this.regularPositionService.update(id, updateRegularPositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regularPositionService.remove(id);
  }
}
