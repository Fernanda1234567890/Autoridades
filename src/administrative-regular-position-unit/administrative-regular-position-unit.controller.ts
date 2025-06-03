import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdministrativeRegularPositionUnitService } from './administrative-regular-position-unit.service';
import { CreateAdministrativeRegularPositionUnitDto } from './dto/create-administrative-regular-position-unit.dto';
import { UpdateAdministrativeRegularPositionUnitDto } from './dto/update-administrative-regular-position-unit.dto';

@Controller('administrative-regular-position-unit')
export class AdministrativeRegularPositionUnitController {
  constructor(private readonly administrativeRegularPositionUnitService: AdministrativeRegularPositionUnitService) {}

  @Post()
  create(@Body() createAdministrativeRegularPositionUnitDto: CreateAdministrativeRegularPositionUnitDto) {
    return this.administrativeRegularPositionUnitService.create(createAdministrativeRegularPositionUnitDto);
  }

  @Get()
  findAll() {
    return this.administrativeRegularPositionUnitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administrativeRegularPositionUnitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdministrativeRegularPositionUnitDto: UpdateAdministrativeRegularPositionUnitDto) {
    return this.administrativeRegularPositionUnitService.update(+id, updateAdministrativeRegularPositionUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.administrativeRegularPositionUnitService.remove(+id);
  }
}
