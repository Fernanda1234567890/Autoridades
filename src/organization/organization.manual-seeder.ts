import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { OrganizationService } from './organization.service';

async function seedOrganizations() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(OrganizationService);

  // Inserta varias organizaciones de prueba
  await service.create({
   
    type: 'principal',
    description: 'Organización principal de prueba'
  });
  await service.create({

    type: 'secundaria',
    description: 'Organización secundaria de prueba'
  });
  await service.create({

    type: 'apoyo',
    description: 'Organización de apoyo de prueba'
  });
  await service.create({
  
    type: 'especial',
    description: 'Organización especial de prueba'
  });

  await app.close();
}

seedOrganizations(); 