import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { StudentService } from './student.service';
import { Repository } from 'typeorm';
import { Person } from 'src/person/entities/person.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

async function seedStudents() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(StudentService);

    // Busca una persona existente
  const personRepo = app.get<Repository<Person>>(getRepositoryToken(Person));
  const person = await personRepo.findOne({ where: { id: 'idPersona' } }); // Ajusta el campo según tu entidad
  if (!person) {
    throw new Error('Person not found');
  }

  // Inserta varios estudiantes de prueba con UUIDs válidos
  await service.create({
    career: 'Ingeniería de Sistemas',
    person_id: person.id, // Asumiendo que person_id es un UUID válido
  });
  await service.create({
    career: 'Derecho',
    person_id: person.id,
  });
  await service.create({
    career: 'Medicina',
    person_id: person.id ,
  });
  await service.create({
    career: 'Arquitectura',
    person_id: person.id,
  });

  await app.close();
}
