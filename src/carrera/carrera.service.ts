import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Carrera } from './entities/carrera.entity';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';

@Injectable()
export class CarreraService {
  constructor(
    @InjectRepository(Carrera)
    private readonly carreraRepository: Repository<Carrera>, // ✅ inyección del repo
  ) {}

  create(createCarreraDto: CreateCarreraDto) {
    return this.carreraRepository.save(
      this.carreraRepository.create(createCarreraDto),
    );
  }

  findAll() {
    return this.carreraRepository.find();
  }

  findOne(id: number) {
    return this.carreraRepository.findOneBy({ id });
  }

  async seed() {
    // await this.carreraRepository.query(`TRUNCATE TABLE carreras CASCADE`);
    // await this.carreraRepository.clear();
    // await this.carreraRepository.query(`ALTER SEQUENCE carreras_id_seq RESTART WITH 1`);

    const datos: CreateCarreraDto[] = [
      { id: 1, nombre: 'Ingeniería de Sistemas', sigla: 'INSIS' },
      { id: 2, nombre: 'Ingeniería Civil', sigla: 'INCIV' },
      { id: 3, nombre: 'Derecho', sigla: 'DER' },
      { id: 4, nombre: 'Medicina', sigla: 'MED' },
    ];

    const mapeados = datos.map((e) => this.carreraRepository.create(e));
    return await this.carreraRepository.save(mapeados);
  }

  update(id: number, updateCarreraDto: UpdateCarreraDto) {
    return this.carreraRepository.update(id, updateCarreraDto);
  }

  remove(id: number) {
    return this.carreraRepository.delete(id);
  }
}
