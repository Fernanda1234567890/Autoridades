import { Module } from '@nestjs/common';
import { CargoIntermedioService } from './cargo-intermedio.service';
import { CargoIntermedioController } from './cargo-intermedio.controller';
import { CargoIntermedio } from './entities/cargo-intermedio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CargoIntermedio])],
  controllers: [CargoIntermedioController],
  providers: [CargoIntermedioService],
  exports: [CargoIntermedioService],
  
})
export class CargoIntermedioModule { }
