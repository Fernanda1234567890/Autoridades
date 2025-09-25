import { Controller, Get } from '@nestjs/common';
import { AutoridadesService } from './autoridades.service';

@Controller('autoridades')
export class AutoridadesController {
  constructor(private readonly autoridadesService: AutoridadesService) {}

  // GET /api/autoridades
  @Get()
  async getAutoridades() {
    return this.autoridadesService.getAutoridades();
  }

  @Get()
  findAll() {
    return this.autoridadesService.findAll();
  }
}
