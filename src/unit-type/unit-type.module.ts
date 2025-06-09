import { Module } from '@nestjs/common';
import { UnitTypeService } from './unit-type.service';
import { UnitTypeController } from './unit-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitType } from './entities/unit-type.entity';

@Module({
  
  imports: [TypeOrmModule.forFeature([UnitType])], // Importa el repositorio de UnitType para poder usarlo en el servicio		
  controllers: [UnitTypeController],
  providers: [UnitTypeService],
  exports: [TypeOrmModule], // Exporta el TypeOrmModule para que otros módulos puedan usar el repositorio de UnitType
})
export class UnitTypeModule {}
