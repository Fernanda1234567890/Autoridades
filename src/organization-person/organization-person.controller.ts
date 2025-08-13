import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizationPersonService } from './organization-person.service';
import { CreateOrganizationPersonDto } from './dto/create-organization-person.dto';
import { UpdateOrganizationPersonDto } from './dto/update-organization-person.dto';

@Controller('organization-person')
export class OrganizationPersonController {
  constructor(private readonly organizationPersonService: OrganizationPersonService) {}

  @Post()
  create(@Body() createOrganizationPersonDto: CreateOrganizationPersonDto) {
    return this.organizationPersonService.create(createOrganizationPersonDto);
  }

  @Get()
  findAll() {
    return this.organizationPersonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationPersonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationPersonDto: UpdateOrganizationPersonDto) {
    return this.organizationPersonService.update(+id, updateOrganizationPersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationPersonService.remove(+id);
  }
}
