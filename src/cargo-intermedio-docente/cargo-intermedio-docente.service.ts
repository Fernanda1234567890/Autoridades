import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CargoIntermedioDocente } from './entities/cargo-intermedio-docente.entity';
import { CreateCargoIntermedioDocenteDto } from './dto/create-cargo-intermedio-docente.dto';
import { UpdateCargoIntermedioDocenteDto } from './dto/update-cargo-intermedio-docente.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CargoIntermedioDocenteService {

  constructor(
    @InjectRepository(CargoIntermedioDocente)
    private readonly cargoIntermedioDocenteRepository: Repository<CargoIntermedioDocente>
  ) {}

  async create(dto: CreateCargoIntermedioDocenteDto) {
    const entity = this.cargoIntermedioDocenteRepository.create(dto);
    return await this.cargoIntermedioDocenteRepository.save(entity);
  }

  async findAll() {
    return await this.cargoIntermedioDocenteRepository.find({
      relations: ['docente', 'cargo_intermedio', 'unidad'],
    });
  }
  async seed() {

    //await this.cargoIntermedioDocenteRepository.query(`TRUNCATE TABLE cargo-intermadio-docente CASCADE`);
    //await this.cargoIntermedioDocenteRepository.clear()
    //await this.cargoIntermedioDocenteRepository.query(`ALTER SEQUENCE "cargo-intermadio-docente_id_seq" RESTART WITH 1`)
    
    const datos: CreateCargoIntermedioDocenteDto[] = [
      {
        id: 1,
        id_docente: 1,
        id_cargo_intermedio: 1,
        fecha_inicio: new Date('2023-01-01'),
        fecha_fin: new Date('2023-12-31')
      },
      {
        id: 2,
        id_docente: 2,
        id_cargo_intermedio: 2,
        fecha_inicio: new Date('2023-02-01'),
        fecha_fin: new Date('2023-12-31')
      }
    ];
     const mapeados = datos.map((e) => this.cargoIntermedioDocenteRepository.create(e));
    return await this.cargoIntermedioDocenteRepository.save(mapeados);
 
  }

  findOne(id: number) {
    return `This action returns a #${id} cargoIntermedioDocente`;
  }

  update(id: number, updateCargoIntermedioDocenteDto: UpdateCargoIntermedioDocenteDto) {
    return `This action updates a #${id} cargoIntermedioDocente`;
  }

  remove(id: number) {
    return `This action removes a #${id} cargoIntermedioDocente`;
  }
}
