import { Module } from '@nestjs/common';
import { TipoUnidadService } from './tipo-unidad.service';
import { TipoUnidadController } from './tipo-unidad.controller';
import { TipoUnidad } from './entities/tipo-unidad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TipoUnidad])],
  controllers: [TipoUnidadController],
  providers: [TipoUnidadService],
  exports: [TipoUnidadService],
  
})
export class TipoUnidadModule { }
