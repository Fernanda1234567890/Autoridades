import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ProfessorService } from './professor.service';
import { Person } from '../person/entities/person.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm'; // <-- FALTA ESTA IMPORTACIÓN


async function seedProfessors() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(ProfessorService);

    // Busca una persona existente
  const personRepo = app.get<Repository<Person>>(getRepositoryToken(Person));
  const person = await personRepo.findOne({ where: { id: 'idPersona' } }); // Ajusta el campo según tu entidad
  if (!person) {
    throw new Error('Person not found');
  }
  // Inserta varios profesores de prueba con UUIDs válidos
  await service.create({
    career: 'Ingeniería de Sistemas',
    person_id: person.id,
  });
  await service.create({
    career: 'Derecho',
    person_id:  person.id,
  });
  await service.create({
    career: 'Medicina',
    person_id:  person.id ,
  });
  await service.create({
    career: 'Arquitectura',
    person_id:  person.id,
  });

  await app.close();
}

seedProfessors();