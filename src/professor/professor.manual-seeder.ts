import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ProfessorService } from './professor.service';

async function seedProfessors() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(ProfessorService);

  // Inserta varios profesores de prueba con UUIDs válidos
  await service.create({
    career: 'Ingeniería de Sistemas',
    person_id: '11111111-1111-1111-1111-111111111111',
  });
  await service.create({
    career: 'Derecho',
    person_id: '22222222-2222-2222-2222-222222222222',
  });
  await service.create({
    career: 'Medicina',
    person_id:  '33333333-3333-3333-3333-333333333333',
  });
  await service.create({
    career: 'Arquitectura',
    person_id: '44444444-4444-4444-4444-444444444444',
  });

  await app.close();
}

seedProfessors();