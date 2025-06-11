import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { IntermediatePositionService } from './intermediate-position.service';
import { Unit } from '../unit/entities/unit.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UnitService } from '../unit/unit.service';

async function seedIntermediatePositions() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(IntermediatePositionService);
  const unitRepo = app.get<Repository<Unit>>( getRepositoryToken(Unit) );
  const unit = await unitRepo.findOne({ where: { name: 'NombreUnit' } });
if (!unit) {
  throw new Error('Unit not found');
}

  // Inserta varias posiciones intermedias de prueba
  await service.create({
    name: 'Coordinador Académico',
    description: 'Responsable de la coordinación académica',
   hierachical_level: 'Alto',
   unit_id: unit.id 
  });
  await service.create({
    name: 'Jefe de Laboratorio',
    description: 'Encargado del laboratorio principal',
    hierachical_level: 'Medio',
    unit_id: unit.id 
  });
  await service.create({
    name: 'Supervisor de Prácticas',
    description: 'Supervisa las prácticas estudiantiles',
    hierachical_level: 'Bajo',
    unit_id: unit.id  
  });
  await service.create({
    name: 'Asistente de Coordinación',
    description: 'Asiste en la coordinación de actividades',
    hierachical_level: 'Bajo',
    unit_id: unit.id 
  });

  await app.close();
}

seedIntermediatePositions();