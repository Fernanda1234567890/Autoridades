import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Facultad } from './entities/facultad.entity';
import { CreateFacultadDto } from './dto/create-facultad.dto';
import { UpdateFacultadDto } from './dto/update-facultad.dto';

@Injectable()
export class FacultadService {
  constructor(
    @InjectRepository(Facultad)
    private readonly facultadRepository: Repository<Facultad>,
  ) {}

  create(createFacultadDto: CreateFacultadDto) {
    const facultad = this.facultadRepository.create(createFacultadDto);
    return this.facultadRepository.save(facultad);
  }

  findAll() {
    return this.facultadRepository.find({ relations: ['carreras'] });
  }

  findOne(id: number) {
    return this.facultadRepository.findOne({
      where: { id },
      relations: ['carreras'],
    });
  }

  async seed() {
    // await this.facultadRepository.query(`TRUNCATE TABLE facultades CASCADE`);
    // await this.facultadRepository.clear();
    // await this.facultadRepository.query(`ALTER SEQUENCE facultades_id_seq RESTART WITH 1`);

      const datos: CreateFacultadDto[] = [
        { id: 1, nombre: 'Facultad de Ingeniería', sigla: 'FING' },
        { id: 2, nombre: 'Facultad de Derecho', sigla: 'FD' },
        { id: 3, nombre: 'Facultad de Medicina', sigla: 'FMED' },
        { id: 4, nombre: 'Facultad de Ciencias Agrícolas', sigla: 'FCA' },
      ];

      const mapeados = datos.map((e) => this.facultadRepository.create(e));
      return await this.facultadRepository.save(mapeados);
    }

  update(id: number, updateFacultadDto: UpdateFacultadDto) {
    return this.facultadRepository.update(id, updateFacultadDto);
  }

  remove(id: number) {
    return this.facultadRepository.delete(id);
  }
}
