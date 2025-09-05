// import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
// import { OrganizacionService } from './organizacion.service';
// import { CreateOrganizacionDto } from './dto/create-organizacion.dto';
// import { UpdateOrganizacionDto } from './dto/update-organizacion.dto';

// @Controller('organizacion')
// export class OrganizacionController {
//   constructor(private readonly organizacionService: OrganizacionService) {}

//   // 📌 Crear organización
//   @Post()
//   async create(@Body() createOrganizacionDto: CreateOrganizacionDto) {
//     const organizacion = await this.organizacionService.create(createOrganizacionDto);
//     return {
//       success: true,
//       message: 'Organización creada correctamente',
//       data: organizacion,
//     };
//   }
//   // 📌 Listar todas con paginación y filtro opcional
//   @Get()
//   async findAll(
//     @Query('page') page: number = 1,
//     @Query('limit') limit: number = 10,
//   ) {
//     // ✅ Ahora sí se pasan al service
//     const result = await this.organizacionService.findAll(+page, +limit);
//     return {
//       success: true,
//       message: 'Lista de organizaciones',
//       data: result.data,
//       total: result.total,
//       page: result.page,
//       limit: result.limit,
//     };
//   }
  
//   @Get('/seed')
//   seed() {
//     return this.organizacionService.seed();
//   }

//   // 📌 Buscar por id
//   @Get(':id')
//   async findOne(@Param('id') id: number) {
//     const organizacion = await this.organizacionService.findOne(+id);
//     if (!organizacion) {
//       throw new NotFoundException(`La organización con id ${id} no existe`);
//     }
//     return {
//       success: true,
//       data: organizacion,
//     };
//   }

//   @Get('buscar/:nombre')
//   async findByName(@Param('nombre') nombre: string) {
//   return this.organizacionService.findByName(nombre);
// }

//   @Patch(':id')
//   async update(
//     @Param('id') id: number,
//     @Body() updateOrganizacionDto: UpdateOrganizacionDto,
//   ) {
//     const data = await this.organizacionService.update(+id, updateOrganizacionDto);
//     return { success: true, message: 'Organización actualizada', data };
//   }


//   // 📌 Actualizar organización
//   @Patch(':id/restore')
//   async restore(@Param('id') id: number) {
//     const data = await this.organizacionService.restore(+id);
//     return { success: true, message: 'Organización restaurada', data };
//   }


//  // Cambiar estado (soft delete)
//   @Delete(':id')
//   async remove(@Param('id') id: number) {
//     const data = await this.organizacionService.remove(+id);
//     return { success: true, message: 'Organización desactivada', data };
//   }
// }
// organizacion.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe} from '@nestjs/common';
import { OrganizacionService } from './organizacion.service';
import { CreateOrganizacionDto } from './dto/create-organizacion.dto';
import { UpdateOrganizacionDto } from './dto/update-organizacion.dto';

@Controller('organizacion')
export class OrganizacionController {
  constructor(private readonly organizacionService: OrganizacionService) {}

  // GET /organizacion?page=1&limit=10&search=abc&estado=activo|inactivo|todos
    @Get()
    getAll(
    @Query('page') page?: '1',
    @Query('limit') limit?: '10',
    @Query('search') search?: string,
    @Query('estado') estado: 'activo' | 'inactivo' | 'todos' = 'todos',
    ) {
       const pageNum = isNaN(Number(page)) ? 1 : Number(page);
       const limitNum = isNaN(Number(limit)) ? 10 : Number(limit);

      return this.organizacionService.findAll({ page: pageNum, limit: limitNum, search, estado });
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
    return this.organizacionService.findOne(+id);
    }


    @Post()
    create(@Body() createOrganizacionDto: CreateOrganizacionDto) {
    return this.organizacionService.create(createOrganizacionDto);
    }

      @Get('/seed')
  seed() {
    return this.organizacionService.seed();
  }

    @Patch(':id')
    update(@Param('id') id: string, @Body() UpdateOrganizacionDto: UpdateOrganizacionDto) {
    return this.organizacionService.update(+id, UpdateOrganizacionDto);
    }


    // Soft delete
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
      return this.organizacionService.remove(id);
    }



    // Cambiar estado explícitamente
    @Patch(':id/estado')
    setEstado(@Param('id') id: string, @Body() body: { estado: boolean }) {
    return this.organizacionService.setEstado(+id, body.estado);
    }


    // Restaurar
    @Patch(':id/restaurar')
    restore(@Param('id') id: string) {
    return this.organizacionService.restore(+id);
    }
}