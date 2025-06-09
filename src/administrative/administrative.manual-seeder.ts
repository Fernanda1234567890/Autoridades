import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AdministrativeService } from './administrative.service';

async function seedAdministratives() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(AdministrativeService);

  // Inserta varios administrativos de prueba
  await service.create({
    area: 'Recursos Humanos',
    person_id: '',
  });
  await service.create({
    area: 'Finanzas',
    person_id:'',
  });
  await service.create({
    area: 'Infraestructura',
    person_id:'',
  });
  await service.create({
    area: 'Secretaría',
    person_id: '',
  });

  await app.close();
}

seedAdministratives();