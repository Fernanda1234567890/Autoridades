import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { StudentService } from './student.service';

async function seedStudents() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(StudentService);

  // Inserta varios estudiantes de prueba con UUIDs válidos
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
    person_id: '',
  });
  await service.create({
    career: 'Arquitectura',
    person_id: '',
  });

  await app.close();
}
