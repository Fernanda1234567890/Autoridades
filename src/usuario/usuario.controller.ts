import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('seed-admin')
  async seedAdmin() {
    return this.usuarioService.seed();
  }
  
// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles('admin')
// @Post()
// create(@Body() createUsuarioDto: CreateUsuarioDto) {
//   return this.usuarioService.create(createUsuarioDto);
// }

@Post()
create(@Body() createUsuarioDto: CreateUsuarioDto) {
  return this.usuarioService.create(createUsuarioDto);
}



  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

    @Get('/seed')
  seed() {
    return this.usuarioService.seed();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
