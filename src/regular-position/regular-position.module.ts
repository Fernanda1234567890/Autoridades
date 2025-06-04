import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegularPositionService } from './regular-position.service';
import { RegularPositionController } from './regular-position.controller';
import { RegularPosition } from './entities/regular-position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegularPosition])],
  controllers: [RegularPositionController],
  providers: [RegularPositionService],
  exports: [TypeOrmModule], // Opcional, solo si necesitas el repositorio fuera de este módulo
})
export class RegularPositionModule {}