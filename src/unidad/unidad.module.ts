import { Module } from '@nestjs/common';
import { UnidadService } from './unidad.service';
import { UnidadController } from './unidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unidad } from './entities/unidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Unidad])],
  controllers: [UnidadController],
  providers: [UnidadService],
})
export class UnidadModule {}
