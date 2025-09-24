import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CargoIntermedioDocente } from './entities/cargo-intermedio-docente.entity';
import { CreateCargoIntermedioDocenteDto } from './dto/create-cargo-intermedio-docente.dto';
import { UpdateCargoIntermedioDocenteDto } from './dto/update-cargo-intermedio-docente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Docente } from 'src/docente/entities/docente.entity';
import { CargoIntermedio } from 'src/cargo-intermedio/entities/cargo-intermedio.entity';
import { Unidad } from 'src/unidad/entities/unidad.entity';

@Injectable()
export class CargoIntermedioDocenteService {

  constructor(
   @InjectRepository(CargoIntermedioDocente)
    private readonly cargoIntermedioDocenteRepository: Repository<CargoIntermedioDocente>,

    @InjectRepository(Docente)
    private readonly docenteRepository: Repository<Docente>,

    @InjectRepository(CargoIntermedio)
    private readonly cargoRepository: Repository<CargoIntermedio>,

    @InjectRepository(Unidad)
    private readonly unidadRepository: Repository<Unidad>,
  ) {}

  async create(dto: CreateCargoIntermedioDocenteDto) {
    const docente = await this.docenteRepository.findOne({ where: { id: dto.id_docente } });
    if (!docente) throw new NotFoundException(`Docente no encontrado`);

    const cargo = await this.cargoRepository.findOne({ where: { id: dto.id_cargo_intermedio } });
    if (!cargo) throw new NotFoundException(`Cargo intermedio no encontrado`);

    let unidad;
    if (dto.id_unidad) {
      unidad = await this.unidadRepository.findOne({ where: { id: dto.id_unidad } });
      if (!unidad) throw new NotFoundException(`Unidad no encontrada`);
    }

    const asignacion = this.cargoIntermedioDocenteRepository.create({
      docente,
      cargo_intermedio: cargo,
      unidad,
      fecha_inicio: dto.fecha_inicio,
      fecha_fin: dto.fecha_fin || undefined,
      id_docente: dto.id_docente,
      id_cargo_intermedio: dto.id_cargo_intermedio,
      id_unidad: dto.id_unidad || undefined,
    });

    return this.cargoIntermedioDocenteRepository.save(asignacion);
  }

  async findAll() {
    return await this.cargoIntermedioDocenteRepository.find({
      relations: ['docente', 'docente.persona', 'cargo_intermedio', 'unidad'],
    });
  }
  async seed() {

    //await this.cargoIntermedioDocenteRepository.query(`TRUNCATE TABLE cargo-intermadio-docente CASCADE`);
    //await this.cargoIntermedioDocenteRepository.clear()
    //await this.cargoIntermedioDocenteRepository.query(`ALTER SEQUENCE "cargo-intermadio-docente_id_seq" RESTART WITH 1`)
    
    const datos: CreateCargoIntermedioDocenteDto[] = [
      // {
      //   id: 1,
      //   id_docente: 1,
      //   id_cargo_intermedio: 1,
      //   fecha_inicio: new Date('2023-01-01'),
      //   fecha_fin: new Date('2023-12-31')
      // },
      // {
      //   id: 2,
      //   id_docente: 2,
      //   id_cargo_intermedio: 2,
      //   fecha_inicio: new Date('2023-02-01'),
      //   fecha_fin: new Date('2023-12-31')
      // }
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
