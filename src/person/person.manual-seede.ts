import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { PersonService } from './person.service';

async function seedPersons() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(PersonService);

  // Inserta varias personas de prueba con datos de ejemplo
  await service.create({
    name: 'Juan',
    last_name: 'Pérez',
    ci: '1111111',
    phone_number: 19345678,
    address: 'Calle 1',
    date_of_birth: new Date('1990-01-02'),
    image: 'https://example.com/image1.png',
    type: 'docente',
    email: 'juan.perez@example.com'
  });
  await service.create({
    name: 'Ana',
    last_name: 'López',
    ci: '2222222',
    phone_number: 12345678,
    address: 'Calle 1',
    date_of_birth: new Date('1990-01-09'),
    image: 'https://example.com/image2.png',
    type: 'estudiante',
    email: 'ana.lopez@example.com'
  });
  await service.create({
    name: 'Carlos',
    last_name: 'Ruiz',
    ci: '3333333',
    phone_number: 12340678,
    address: 'Calle 1',
    date_of_birth: new Date('1990-01-07'),
    image: 'https://example.com/image3.png',
    type: 'administrativo',
    email: 'carlos.ruiz@example.com'
  });
  await service.create({
    name: 'María',
    last_name: 'Gómez',
    ci: '4444444',
    phone_number: 12345678,
    address: 'Calle 1',
    date_of_birth: new Date('1990-01-26'),
    image: 'https://example.com/image4.png',
    type: 'docente',
    email: 'maria.gomez@example.com'
  });

  await app.close();
}

seedPersons();