import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministrativeService } from './administrative.service';
import { AdministrativeController } from './administrative.controller';
import { Administrative } from './entities/administrative.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Administrative])],
  controllers: [AdministrativeController],
  providers: [AdministrativeService],
  exports: [TypeOrmModule], // Opcional, solo si necesitas el repositorio fuera de este módulo
})
export class AdministrativeModule {}