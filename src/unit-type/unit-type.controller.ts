import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UnitTypeService } from './unit-type.service';
import { CreateUnitTypeDto } from './dto/create-unit-type.dto';
import { UpdateUnitTypeDto } from './dto/update-unit-type.dto';

@Controller('unit-type')
export class UnitTypeController {
  constructor(private readonly unitTypeService: UnitTypeService) {}

  @Post()
  create(@Body() createUnitTypeDto: CreateUnitTypeDto) {
    return this.unitTypeService.create(createUnitTypeDto);
  }

  @Get()
  findAll() {
    return this.unitTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unitTypeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnitTypeDto: UpdateUnitTypeDto) {
    return this.unitTypeService.update(id, updateUnitTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unitTypeService.remove(id);
  }
}
