import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UnitService } from './unit.service';

async function seedUnits() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(UnitService);

  // Inserta varias unidades de prueba
  await service.create({
    name: 'Unidad de Prueba 1',
    type: 'unidad_mayor',
    description: 'Esta es una unidad de prueba',
    logo: 'https://example.com/logo1.png',
    responsible: 'Juan Pérez',
    depends_on: '',
    unitTypeId: '',
    intermediatePositionId: '',
    administrativeRegularPositionUnitId: '',
    parentUnitId: ''
  });
  await service.create({
    name: 'Unidad de Prueba 2',
    type: 'unidad_mayor',
    description: 'Esta es una unidad de prueba',
    logo: 'https://example.com/logo2.png',
    responsible: 'Ana López',
    depends_on: '',
    unitTypeId: '',
    intermediatePositionId: '',
    administrativeRegularPositionUnitId: '',
    parentUnitId: ''
  });
  await service.create({
    name: 'Unidad de Prueba 3',
    type: 'unidad_intermedia',
    description: 'Unidad intermedia de prueba',
    logo: 'https://example.com/logo3.png',
    responsible: 'Carlos Ruiz',
    depends_on: '',
    unitTypeId: '',
    intermediatePositionId: '',
    administrativeRegularPositionUnitId: '',
    parentUnitId: ''
  });
  await service.create({
    name: 'Unidad de Prueba 4',
    type: 'unidad_subdependiente',
    description: 'Unidad subdependiente de prueba',
    logo: 'https://example.com/logo4.png',
    responsible: 'María Gómez',
    depends_on: '',
    unitTypeId: '',
    intermediatePositionId: '',
    administrativeRegularPositionUnitId: '',
    parentUnitId: ''
  });

  await app.close();
}

seedUnits();
