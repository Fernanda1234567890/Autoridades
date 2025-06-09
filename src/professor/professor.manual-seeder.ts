import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ProfessorService } from './professor.service';

async function seedProfessors() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(ProfessorService);

  // Inserta varios profesores de prueba con UUIDs válidos
  await service.create({
    career: 'Ingeniería de Sistemas',
    person_id: '',
  });
  await service.create({
    career: 'Derecho',
    person_id: '',
  });
  await service.create({
    career: 'Medicina',
    person_id:  '',
  });
  await service.create({
    career: 'Arquitectura',
    person_id: '',
  });

  await app.close();
}

seedProfessors();