import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoridadesService } from './autoridades.service';
import { AutoridadesController } from './autoridades.controller';
import { AdministrativoCargoRegularUnidad } from 'src/administrativo-cargo-regular-unidad/entities/administrativo-cargo-regular-unidad.entity';
import { CargoIntermedioDocente } from 'src/cargo-intermedio-docente/entities/cargo-intermedio-docente.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdministrativoCargoRegularUnidad,
      CargoIntermedioDocente,
    ]),
  ],
  providers: [AutoridadesService],
  controllers: [AutoridadesController],
})
export class AutoridadesModule {}
