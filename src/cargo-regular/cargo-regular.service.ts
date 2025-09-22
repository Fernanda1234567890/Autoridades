import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCargoRegularDto } from './dto/create-cargo-regular.dto';
import { UpdateCargoRegularDto } from './dto/update-cargo-regular.dto';
import { CargoRegular } from './entities/cargo-regular.entity';
import { ILike, Repository } from 'typeorm';
//import { AdministrativoCargoRegularUnidad } from 'src/administrativo-cargo-regular-unidad/entities/administrativo-cargo-regular-unidad.entity';

export interface FindAllOptions {
  page?: number;
  limit?: number;
  search?: string;
  estado?: 'activo' | 'inactivo' | 'todos';
}

@Injectable()
export class CargoRegularService {
  constructor(
    @InjectRepository(CargoRegular)
    private readonly cargoRepository: Repository<CargoRegular>,
  ) {}

  async create(dto: CreateCargoRegularDto) {
    const nombre = dto.nombre?.trim();
    const descripcion = dto.descripcion?.trim();
    //const nivel_jerarquico = dto.nivel_jerarquico ?? null;

    if (!nombre || !descripcion) {
      throw new BadRequestException('Nombre y descripción son requeridos');
    }

    const exists = await this.cargoRepository.findOne({ where: { nombre } });
    if (exists) throw new BadRequestException(`Ya existe un cargo regular con el nombre "${nombre}"`);

    const cargo = this.cargoRepository.create({
      nombre,
      descripcion,
      nivel_jerarquico: dto.nivel_jerarquico ?? undefined,
      estado: true,
    });

    return await this.cargoRepository.save(cargo);
  }

  async findAll({ page = 1, limit = 10, search, estado = 'activo' }: FindAllOptions) {
    const query = this.cargoRepository.createQueryBuilder('cargo');

    if (search) {
      query.andWhere('cargo.nombre ILIKE :search OR cargo.descripcion ILIKE :search', { search: `%${search}%` });
    }

    if (estado !== 'todos') {
      query.andWhere('cargo.estado = :estado', { estado: estado === 'activo' });
    }

    query.orderBy('cargo.id', 'DESC');

    const [data, total] = await query.skip((page - 1) * limit).take(limit).getManyAndCount();

    return { success: true, data, meta: { total, page, limit } };
  }


  async seed() {

    //await this.cargoRegularRepository.query(`TRUNCATE TABLE cargos-regulares CASCADE`);
    //await this.cargoRegularRepository.clear()
    //await this.cargoRegularRepository.query(`ALTER SEQUENCE "cargos-regulares_id_seq" RESTART WITH 1`)

    const datos: CreateCargoRegularDto[] = [
      {
        nombre: 'Rector',
        descripcion: 'Máxima autoridad de la Universidad Autonoma Tomas Frias',
        nivel_jerarquico: 1,  
      },
      {
        nombre: 'Vicerrector',
        descripcion: 'Máxima autoridad de la Universidad Autonoma Tomas Frias',
        nivel_jerarquico: 1,
      },
      {
        nombre: 'secretaria/o',
        descripcion: 'Secretario/a General',
        nivel_jerarquico: 3,
      },
      {
        nombre: 'Director de Unidad',
        descripcion: 'Director de una unidad',
        nivel_jerarquico: 4,
      }
    ]

    for (const cargo of datos) {
    const exists = await this.cargoRepository.findOne({
      where: { nombre: cargo.nombre },
    });

    if (!exists) {
      const nuevo = this.cargoRepository.create(cargo);
      await this.cargoRepository.save(nuevo);
    }
  }

  return { message: 'Seed ejecutado correctamente' };
  }

  async findOne(id: number) {
    const cargo = await this.cargoRepository.findOne({
      where: { id },
      relations: ['administrativo_cargo_regular_unidades'],
    });
    if (!cargo) throw new NotFoundException('Cargo regular no encontrado');
    return cargo;
  }

  async findByName(nombre: string) {
    const cargos = await this.cargoRepository.find({
      where: { nombre: ILike(`%${nombre}%`) },
    });
    return {
      success: true,
      message: cargos.length > 0 ? 'Resultados encontrados' : 'No se encontraron coincidencias',
      data: cargos,
    };
  }
 
  async update(id: number, dto: UpdateCargoRegularDto) {
    const cargo = await this.findOne(id);
    Object.assign(cargo, dto);
    return this.cargoRepository.save(cargo);
  }

  async remove(id: number) {
    const cargo = await this.findOne(id);

    if (!cargo.estado) {
      throw new BadRequestException('El cargo ya está dado de baja');
    }

    if (cargo.administrativo_cargo_regular_unidades?.length > 0) {
      throw new BadRequestException('No se puede dar de baja: tiene relaciones activas');
    }

    cargo.estado = false;
    return this.cargoRepository.save(cargo);
  }

  async restore(id: number) {
    const cargo = await this.findOne(id);
    if (cargo.estado) throw new BadRequestException('El cargo ya está activo');
    cargo.estado = true;
    return this.cargoRepository.save(cargo);
  }
}