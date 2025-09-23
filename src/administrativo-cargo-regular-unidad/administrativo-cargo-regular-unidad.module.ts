import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministrativoCargoRegularUnidadService } from './administrativo-cargo-regular-unidad.service';
import { AdministrativoCargoRegularUnidadController } from './administrativo-cargo-regular-unidad.controller';
import { AdministrativoCargoRegularUnidad } from './entities/administrativo-cargo-regular-unidad.entity';
import { Administrativo } from 'src/administrativo/entities/administrativo.entity';
import { CargoRegular } from 'src/cargo-regular/entities/cargo-regular.entity';
import { Unidad } from 'src/unidad/entities/unidad.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdministrativoCargoRegularUnidad,
      Administrativo,
      CargoRegular,
      Unidad,
    ]),
  ],
  controllers: [AdministrativoCargoRegularUnidadController],
  providers: [AdministrativoCargoRegularUnidadService],
  exports: [AdministrativoCargoRegularUnidadService],
})
export class AdministrativoCargoRegularUnidadModule {}
