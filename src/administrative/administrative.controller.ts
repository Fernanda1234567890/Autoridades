import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdministrativeService } from './administrative.service';
import { CreateAdministrativeDto } from './dto/create-administrative.dto';
import { UpdateAdministrativeDto } from './dto/update-administrative.dto';

@Controller('administrative')
export class AdministrativeController {
  constructor(private readonly administrativeService: AdministrativeService) {}

  @Post()
  create(@Body() createAdministrativeDto: CreateAdministrativeDto) {
    return this.administrativeService.create(createAdministrativeDto);
  }

  @Get()
  findAll() {
    return this.administrativeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administrativeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdministrativeDto: UpdateAdministrativeDto) {
    return this.administrativeService.update(+id, updateAdministrativeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.administrativeService.remove(+id);
  }
}
