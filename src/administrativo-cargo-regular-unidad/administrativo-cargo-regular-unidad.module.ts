import { Module } from '@nestjs/common';
import { AdministrativoCargoRegularUnidadService } from './administrativo-cargo-regular-unidad.service';
import { AdministrativoCargoRegularUnidadController } from './administrativo-cargo-regular-unidad.controller';
import { AdministrativoCargoRegularUnidad } from './entities/administrativo-cargo-regular-unidad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AdministrativoCargoRegularUnidad])],
  controllers: [AdministrativoCargoRegularUnidadController],
  providers: [AdministrativoCargoRegularUnidadService],
})
export class AdministrativoCargoRegularUnidadModule {}
