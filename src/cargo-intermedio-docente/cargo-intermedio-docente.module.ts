import { Module } from '@nestjs/common';
import { CargoIntermedioDocenteService } from './cargo-intermedio-docente.service';
import { CargoIntermedioDocenteController } from './cargo-intermedio-docente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CargoIntermedioDocente } from './entities/cargo-intermedio-docente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CargoIntermedioDocente])],
  controllers: [CargoIntermedioDocenteController],
  providers: [CargoIntermedioDocenteService],
  exports: [CargoIntermedioDocenteService],
  
})
export class CargoIntermedioDocenteModule { }
   