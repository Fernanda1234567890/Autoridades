import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { RegularPositionService } from './regular-position.service';

async function seedRegularPositions() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(RegularPositionService);

  // Inserta varias posiciones regulares de ejemplo
  await service.create({
    name: 'Jefe de Departamento',
    description: 'Responsable del área de sistemas',
     hierachical_level: 'Alto',
  });
  await service.create({
    name: 'Analista',
    description: 'Analiza procesos y sistemas',
     hierachical_level: 'Medio',
  });
  await service.create({
    name: 'Asistente',
    description: 'Asiste en tareas administrativas',
    hierachical_level: 'Bajo',
  });

  await app.close();
}

seedRegularPositions();