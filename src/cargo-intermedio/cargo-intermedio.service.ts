import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCargoIntermedioDto } from './dto/create-cargo-intermedio.dto';
import { UpdateCargoIntermedioDto } from './dto/update-cargo-intermedio.dto';
import { ILike, Repository } from 'typeorm';
import { CargoIntermedio } from './entities/cargo-intermedio.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CargoIntermedioService {
  constructor(
    @Inject('CargoIntermedioRepository')
    private readonly cargoIntermedioRepository: Repository<CargoIntermedio>
  ) {}
 async create(createCargoIntermedioDto: CreateCargoIntermedioDto) {
    const existe = await this.cargoIntermedioRepository.findOne({
      where: { nombre: createCargoIntermedioDto.nombre },
    });
    if (existe) {
      throw new BadRequestException(`Ya existe un cargo intermedio con nombre ${createCargoIntermedioDto.nombre}`);
    }

    const nuevoCargo = this.cargoIntermedioRepository.create(createCargoIntermedioDto);
    const saved = await this.cargoIntermedioRepository.save(nuevoCargo);

    return {
      success: true,
      message: 'Cargo intermedio creado correctamente',
      data: saved,
    };
  }

  async findAll(page: number = 1, limit: number = 10) {
    const [items, total] = await this.cargoIntermedioRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['unidad'],
      order: { id: 'ASC' },
    });

    return {
      success: true,
      data: items,
      total,
      page,
      limit,
    };
  }

  async seed(){

    // await this.cargoIntermedioRepository.query(`TRUNCATE TABLE cargos-intermedios CASCADE`);
    // await this.cargoIntermedioRepository.clear()
    // await this.cargoIntermedioRepository.query(`ALTER SEQUENCE "cargos-intermedios_id_seq" RESTART WITH 1`)
    
    const datos: CreateCargoIntermedioDto[] = [
      { nombre: 'Rector', descripcion: 'Rector', nivel_jerarquico: 1, id_unidad: 1,},
      { nombre: 'Vicerrector', descripcion: 'Vicerrector', nivel_jerarquico: 1, id_unidad: 20,},
      { nombre: 'Secretaria', descripcion: 'Secretaria', nivel_jerarquico: 2, id_unidad: 2, },
      { nombre: 'Director de Relaciones Nacionales e Internacionales ', descripcion: 'director', nivel_jerarquico: 1, id_unidad: 18,},
      { nombre: 'Director/a de Servicios academicos', descripcion: 'Director/a', nivel_jerarquico: 3, id_unidad: 22, },
      { nombre: 'Director/a de Planificación Universitaria ', descripcion: 'Director/a', nivel_jerarquico:2 , id_unidad: 7, },
      { nombre: 'Director/a Administrativo Financiero', descripcion: 'Director/a', nivel_jerarquico:2 , id_unidad: 10, },
      { nombre: 'Director/a de Investigación Científica y Tecnológica', descripcion: 'Director/a', nivel_jerarquico:2 , id_unidad: 21, },
      { nombre: 'Director/a de Interacción Social y Extensión Universitaria', descripcion: 'Director/a', nivel_jerarquico:2 , id_unidad: 24, },
      { nombre: 'Director/a de Evaluación y Acreditación', descripcion: 'Director/a', nivel_jerarquico:2 , id_unidad:6 , },
      { nombre: 'Director/a de Postgrado', descripcion: 'Director/a', nivel_jerarquico:2 , id_unidad: 23, },
      { nombre: 'Decano de la Facultad de Derecho', descripcion: 'Decano', nivel_jerarquico:2 , id_unidad:31 , },
      { nombre: 'Decano de la Facultad de Ingeniería', descripcion: 'Decano', nivel_jerarquico:2 , id_unidad: 39, },
      { nombre: 'Decano de la Facultad de Ingeniería Minera', descripcion: 'Decano', nivel_jerarquico:2 , id_unidad: 43, },
      { nombre: 'Decano de la Facultad de Ciencias Puras', descripcion: 'Decano', nivel_jerarquico:2 , id_unidad: 46, },
      { nombre: 'Decano de la Facultad de Ciencias Sociales y Humanísticas', descripcion: 'Decano', nivel_jerarquico:2 , id_unidad: 52, },
      { nombre: 'Decano de la Facultad de Medicina', descripcion: 'Decano', nivel_jerarquico: 2, id_unidad: 57, },
      { nombre: 'Director de la carrera de Derecho', descripcion: 'Director', nivel_jerarquico: 3, id_unidad: 32,},
      { nombre: 'Director de la Carrera de Ingeniería Civil', descripcion: 'Director', nivel_jerarquico: 3, id_unidad:40 , },
      { nombre: 'Director de la Carrera de Estadística', descripcion: 'Director', nivel_jerarquico: 3, id_unidad:47 , },
      { nombre: 'Director de la Carrera de Turismo', descripcion: 'Director', nivel_jerarquico:3 , id_unidad:53 , },
      { nombre: 'Director de la Carrera de Medicina ', descripcion: 'Director', nivel_jerarquico: 3, id_unidad: 58, },
      { nombre: 'Encargado Data Center', descripcion: 'Encargado', nivel_jerarquico: 2, id_unidad: 19, },

    ]
            const mapeados = datos.map((e)=> this.cargoIntermedioRepository.create(e))
        return await this.cargoIntermedioRepository.save(mapeados)
  }

  async findOne(id: number) {
    const cargo = await this.cargoIntermedioRepository.findOne({
      where: { id },
      relations: ['unidad'],
    });
    if (!cargo) {
      throw new NotFoundException(`Cargo intermedio con id ${id} no encontrado`);
    }
    return {
      success: true,
      data: cargo,
    };
  }
  async findByName(nombre: string) {
    const cargos = await this.cargoIntermedioRepository.find({
      where: { nombre: ILike(`%${nombre}%`) },
      relations: ['unidad'],
    });

    return {
      success: true,
      message: cargos.length > 0 ? 'Resultados encontrados' : 'No se encontraron coincidencias',
      data: cargos,
    };
  }

  async update(id: number, updateCargoIntermedioDto: UpdateCargoIntermedioDto) {
    const cargo = await this.cargoIntermedioRepository.findOne({ where: { id } });
    if (!cargo) {
      throw new NotFoundException(`Cargo intermedio con id ${id} no encontrado`);
    }

    Object.assign(cargo, updateCargoIntermedioDto);
    const updated = await this.cargoIntermedioRepository.save(cargo);

    return {
      success: true,
      message: 'Cargo intermedio actualizado correctamente',
      data: updated,
    };
  }

    async remove(id: number) {
    const cargo = await this.cargoIntermedioRepository.findOne({ where: { id } });
    if (!cargo) {
      throw new NotFoundException(`Cargo intermedio con id ${id} no encontrado`);
    }

    await this.cargoIntermedioRepository.remove(cargo);

    return {
      success: true,
      message: 'Cargo intermedio eliminado correctamente',
      data: cargo,
    };
  }

}