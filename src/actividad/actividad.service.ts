
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actividad } from './entities/actividad.entity';
import { CreateActividadDto } from './dto/create-actividad.dto';

@Injectable()
export class ActividadService {
  constructor(
    @InjectRepository(Actividad)
    private readonly actividadRepository: Repository<Actividad>,
  ) {}

async create(dto: CreateActividadDto, usuarioId?: number) {
  const actividad = this.actividadRepository.create({
    ...dto,
    usuario: usuarioId ? { id: usuarioId } : undefined, // relación con usuario
  });
  return this.actividadRepository.save(actividad);
}

  async findAll() {
    return this.actividadRepository.find({
      relations: ['usuario'],
    });
  }

  async findOne(id: number) {
    return this.actividadRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });
  }

  async remove(id: number) {
    return this.actividadRepository.delete(id);
  }

  async listarActividades(usuarioId: number) {
    return this.actividadRepository.find({
      where: { usuario: { id: usuarioId } },
      relations: ['usuario'],
      order: { fecha: 'DESC' },
    });
  }
}
