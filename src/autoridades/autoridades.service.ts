import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdministrativoCargoRegularUnidad } from 'src/administrativo-cargo-regular-unidad/entities/administrativo-cargo-regular-unidad.entity';
import { CargoIntermedioDocente } from 'src/cargo-intermedio-docente/entities/cargo-intermedio-docente.entity';

@Injectable()
export class AutoridadesService {
  constructor(
    @InjectRepository(AdministrativoCargoRegularUnidad)
    private readonly adminRepo: Repository<AdministrativoCargoRegularUnidad>,
    
    @InjectRepository(CargoIntermedioDocente)
    private readonly docenteRepo: Repository<CargoIntermedioDocente>,
  ) {}

  // Trae todos los administrativos activos con persona y unidad
  async getAdministrativos() {
    return this.adminRepo.find({
      relations: ['administrativo', 'administrativo.persona', 'unidad', 'cargo_regular'],
      order: { id: 'ASC' }, // del primero registrado al último
    });
  }

  // Trae todos los docentes activos con cargo intermedio y unidad
  async getDocentes() {
    return this.docenteRepo.find({
      relations: ['docente', 'docente.persona', 'cargo_intermedio', 'unidad'],
      order: { id: 'ASC' }, // del primero registrado al último
    });
  }

  // Trae todo junto para frontend
  async getAutoridades() {
    const administrativos = await this.getAdministrativos();
    const docentes = await this.getDocentes();
    return { administrativos, docentes };
  }

   async findAll() {
    // Traer administrativos
    const administrativos = await this.adminRepo.find({
      relations: ['administrativo', 'administrativo.persona', 'cargo_regular', 'unidad'],
      order: { id: 'ASC' }, // del primero al último
    });

    // Traer docentes
    const docentes = await this.docenteRepo.find({
      relations: ['docente', 'docente.persona', 'cargo_intermedio', 'cargo_intermedio.unidad'],
      order: { id: 'ASC' },
    });

    return [...administrativos, ...docentes];
  }

}
