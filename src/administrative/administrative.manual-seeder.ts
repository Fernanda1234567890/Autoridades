import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AdministrativeService } from './administrative.service';

async function seedAdministratives() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(AdministrativeService);

  // Inserta varios administrativos de prueba
  await service.create({
    area: 'Recursos Humanos',
    person_id: '11111111-1111-1111-1111-111111111111',
  });
  await service.create({
    area: 'Finanzas',
    person_id:'22222222-2222-2222-2222-222222222222',
  });
  await service.create({
    area: 'Infraestructura',
    person_id:'33333333-3333-3333-3333-333333333333',
  });
  await service.create({
    area: 'Secretaría',
    person_id: '44444444-4444-4444-4444-444444444444',
  });

  await app.close();
}

seedAdministratives();