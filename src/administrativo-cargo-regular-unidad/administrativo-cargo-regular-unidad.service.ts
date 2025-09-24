import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdministrativoCargoRegularUnidad } from './entities/administrativo-cargo-regular-unidad.entity';
import { CreateAdministrativoCargoRegularUnidadDto } from './dto/create-administrativo-cargo-regular-unidad.dto';
import { UpdateAdministrativoCargoRegularUnidadDto } from './dto/update-administrativo-cargo-regular-unidad.dto';
import { Administrativo } from 'src/administrativo/entities/administrativo.entity';
import { CargoRegular } from 'src/cargo-regular/entities/cargo-regular.entity';
import { Unidad } from 'src/unidad/entities/unidad.entity';

@Injectable()
export class AdministrativoCargoRegularUnidadService {

  constructor(
    @InjectRepository(AdministrativoCargoRegularUnidad)
    private readonly administrativoCargoRegularUnidadRepository: Repository<AdministrativoCargoRegularUnidad>,

    @InjectRepository(Administrativo)
    private readonly administrativoRepository: Repository<Administrativo>,

    @InjectRepository(CargoRegular)
    private readonly cargoRepository: Repository<CargoRegular>,

    @InjectRepository(Unidad)
    private readonly unidadRepository: Repository<Unidad>,
  ) {}

  
  async create(dto: CreateAdministrativoCargoRegularUnidadDto) {
    const administrativo = await this.administrativoRepository.findOne({ where: { id: dto.id_administrativo } });
    if (!administrativo) throw new NotFoundException('Administrativo no encontrado');

    const cargo = await this.cargoRepository.findOne({ where: { id: dto.id_cargo } });
    if (!cargo) throw new NotFoundException('Cargo no encontrado');

    const unidad = await this.unidadRepository.findOne({ where: { id: dto.id_unidad } });
    if (!unidad) throw new NotFoundException('Unidad no encontrada');

    const asignacion = this.administrativoCargoRegularUnidadRepository.create({
      fecha_ingreso: dto.fecha_ingreso,
      fecha_fin: dto.fecha_fin || undefined,
      activo: dto.activo ?? true,
      administrativo,
      cargo_regular: cargo,
      unidad,
    });

    return await this.administrativoCargoRegularUnidadRepository.save(asignacion);
  }

  // Obtener todas las asignaciones con relaciones
  async findAll() {
  const asignaciones = await this.administrativoCargoRegularUnidadRepository.find({
    relations: ['administrativo', 'administrativo.persona', 'cargo_regular', 'unidad'],
  });

  return {
    success: true,
    data: asignaciones,
  };
}


  async seed(){

    //await this.adimnistrativoCargoRegularUnidadRepository.query(`TRUNCATE TABLE administrativo-cargo-regular-unidad CASCADE`);
    //await this.adimnistrativoCargoRegularUnidadRepository.clear()
    //await this.adimnistrativoCargoRegularUnidadRepository.query(`ALTER SEQUENCE "administrativo-cargo-regular-unidad_id_seq" RESTART WITH 1`)
    
    const datos: CreateAdministrativoCargoRegularUnidadDto[] = [
      // {
      //   id_cargo: 1,
      //   id_unidad: 1,
      //   id_administrativo: 1,
      //   fecha_ingreso: new Date('2023-01-01'),
      // },
      // {
      //   id_cargo: 2,
      //   id_unidad: 2,
      //   id_administrativo: 2,
      //   fecha_ingreso: new Date('2023-02-01'),
      // }
    ];
     const mapeados = datos.map((e) => this.administrativoCargoRegularUnidadRepository.create(e));
    return await this.administrativoCargoRegularUnidadRepository.save(mapeados);
 
  }

  // Obtener una asignación por id
  async findOne(id: number) {
    const asignacion = await this.administrativoCargoRegularUnidadRepository.findOne({
      where: { id },
      relations: ['administrativo', 'administrativo.persona', 'cargo_regular', 'unidad'],
    });
    if (!asignacion) throw new NotFoundException('Asignación no encontrada');
    return asignacion;
  }

  // Actualizar asignación
  async update(id: number, dto: UpdateAdministrativoCargoRegularUnidadDto) {
    const asignacion = await this.findOne(id);

    if (dto.id_administrativo) {
      const admin = await this.administrativoRepository.findOne({ where: { id: dto.id_administrativo } });
      if (!admin) throw new NotFoundException('Administrativo no encontrado');
      asignacion.administrativo = admin;
    }

    if (dto.id_cargo) {
      const cargo = await this.cargoRepository.findOne({ where: { id: dto.id_cargo } });
      if (!cargo) throw new NotFoundException('Cargo no encontrado');
      asignacion.cargo_regular = cargo;
    }

    if (dto.id_unidad) {
      const unidad = await this.unidadRepository.findOne({ where: { id: dto.id_unidad } });
      if (!unidad) throw new NotFoundException('Unidad no encontrada');
      asignacion.unidad = unidad;
    }

    asignacion.fecha_ingreso = dto.fecha_ingreso ?? asignacion.fecha_ingreso;
    asignacion.fecha_fin = dto.fecha_fin ?? asignacion.fecha_fin;
    asignacion.activo = dto.activo ?? asignacion.activo;

    return await this.administrativoCargoRegularUnidadRepository.save(asignacion);
  }

  // Eliminar asignación
  async remove(id: number) {
    const asignacion = await this.findOne(id);
    return await this.administrativoCargoRegularUnidadRepository.remove(asignacion);
  }
}
