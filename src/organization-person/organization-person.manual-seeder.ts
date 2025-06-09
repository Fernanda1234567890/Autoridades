import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { OrganizationPersonService } from './organization-person.service';

async function seedOrganizationPersons() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(OrganizationPersonService);

  // Inserta varias relaciones de prueba entre organización y persona
  await service.create({
    organization_id: 'org-uuid-1', // Reemplaza con un UUID válido de Organization
    person_id: 'person-uuid-1',    // Reemplaza con un UUID válido de Person
    //startDate: new Date('2023-01-01'),
    //endDate: null,
  });
  await service.create({
    organization_id: 'org-uuid-2',
    person_id: 'person-uuid-2',
    //startDate: new Date('2023-02-01'),
    //endDate: null,
  });
  await service.create({
    organization_id: 'org-uuid-1',
    person_id: 'person-uuid-3',
    //startDate: new Date('2023-03-01'),
    //endDate: null,
  });
  await service.create({
    organization_id: 'org-uuid-3',
    person_id: 'person-uuid-4',
   // startDate: new Date('2023-04-01'),
    //endDate: null,
  });

  await app.close();
}

seedOrganizationPersons();