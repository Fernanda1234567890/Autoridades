import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Facultad } from './entities/facultad.entity';
import { FacultadService } from './facultad.service';
import { FacultadController } from './facultad.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Facultad])],
  controllers: [FacultadController],
  providers: [FacultadService],
  exports: [FacultadService], 
})
export class FacultadModule {}
