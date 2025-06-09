import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AdministrativeRegularPositionUnitService } from './administrative-regular-position-unit.service';

async function seedAdministrativeRegularPositionUnits() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(AdministrativeRegularPositionUnitService);

  // Inserta varias unidades administrativas de prueba
  await service.create({
    regular_position_id: 'regular-position-uuid-1', // Reemplaza con un UUID válido
    units_id: 'unit-uuid-1',                        // Reemplaza con un UUID válido
    administrative_id: 'administrative-uuid-1',     // Reemplaza con un UUID válido
    entry_date: new Date('2023-01-01'),
  });
  await service.create({
    regular_position_id: 'regular-position-uuid-2',
    units_id: 'unit-uuid-2',
    administrative_id: 'administrative-uuid-2',
    entry_date: new Date('2023-02-01'),
  });
  await service.create({
    regular_position_id: 'regular-position-uuid-3',
    units_id: 'unit-uuid-3',
    administrative_id: 'administrative-uuid-3',
    entry_date: new Date('2023-03-01'),
  });
  await service.create({
    regular_position_id: 'regular-position-uuid-4',
    units_id: 'unit-uuid-4',
    administrative_id: 'administrative-uuid-4',
    entry_date: new Date('2023-04-01'),
  });

  await app.close();
}

seedAdministrativeRegularPositionUnits();