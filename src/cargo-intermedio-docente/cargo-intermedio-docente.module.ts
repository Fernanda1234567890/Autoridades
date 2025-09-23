import { Module } from '@nestjs/common';
import { CargoIntermedioDocenteService } from './cargo-intermedio-docente.service';
import { CargoIntermedioDocenteController } from './cargo-intermedio-docente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CargoIntermedioDocente } from './entities/cargo-intermedio-docente.entity';
import { Docente } from 'src/docente/entities/docente.entity';
import { CargoIntermedio } from 'src/cargo-intermedio/entities/cargo-intermedio.entity';
import { Unidad } from 'src/unidad/entities/unidad.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CargoIntermedioDocente,
      Docente,
      CargoIntermedio,
      Unidad,
    ]),
  ],
  controllers: [CargoIntermedioDocenteController],
  providers: [CargoIntermedioDocenteService],
  exports: [CargoIntermedioDocenteService],
})
export class CargoIntermedioDocenteModule {}