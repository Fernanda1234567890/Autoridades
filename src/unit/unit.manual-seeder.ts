import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UnitService } from './unit.service';
import { UnitType } from '../unit-type/entities/unit-type.entity';
import { IntermediatePosition } from '../intermediate-position/entities/intermediate-position.entity';
import { AdministrativeRegularPositionUnit } from '../administrative-regular-position-unit/entities/administrative-regular-position-unit.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

async function seedUnits() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(UnitService);

    // Obtén los repositorios
  const unitTypeRepo = app.get<Repository<UnitType>>(getRepositoryToken(UnitType));
  const intermediatePositionRepo = app.get<Repository<IntermediatePosition>>(getRepositoryToken(IntermediatePosition));
  const arpuRepo = app.get<Repository<AdministrativeRegularPositionUnit>>(getRepositoryToken(AdministrativeRegularPositionUnit));

  // Busca los registros necesarios (ajusta los criterios según tus datos reales)
  const unitType = await unitTypeRepo.findOne({ where: { name: 'NombreUnitType' } });
  const intermediatePosition = await intermediatePositionRepo.findOne({ where: { name: 'NombreIntermediatePosition' } });
  const administrativeRegularPositionUnit = await arpuRepo.findOne({ where: { id: 'uuid-o-criterio' } });

  if (!unitType || !intermediatePosition || !administrativeRegularPositionUnit) {
    console.error('Faltan registros relacionados. Crea primero UnitType, IntermediatePosition y AdministrativeRegularPositionUnit.');
    await app.close();
    return;
  }

  // Inserta varias unidades de prueba
  await service.create({
    name: 'Unidad de Prueba 1',
    type: 'unidad_mayor',
    description: 'Esta es una unidad de prueba',
    logo: 'https://example.com/logo1.png',
    responsible: 'Juan Pérez',
    depends_on: '',
    unitTypeId: unitType.id,
    intermediatePositionId: intermediatePosition.id,
    administrativeRegularPositionUnitId: administrativeRegularPositionUnit.id,
    parentUnitId: '',
    
  });
  await service.create({
    name: 'Unidad de Prueba 2',
    type: 'unidad_mayor',
    description: 'Esta es una unidad de prueba',
    logo: 'https://example.com/logo2.png',
    responsible: 'Ana López',
    depends_on: '',
    unitTypeId: unitType.id,
    intermediatePositionId: intermediatePosition.id,
    administrativeRegularPositionUnitId: administrativeRegularPositionUnit.id,
    parentUnitId: '',
  });
  await service.create({
    name: 'Unidad de Prueba 3',
    type: 'unidad_intermedia',
    description: 'Unidad intermedia de prueba',
    logo: 'https://example.com/logo3.png',
    responsible: 'Carlos Ruiz',
    depends_on: '',
    unitTypeId: unitType.id,
    intermediatePositionId: intermediatePosition.id,
    administrativeRegularPositionUnitId: administrativeRegularPositionUnit.id,
    parentUnitId: '',
  });
  await service.create({
    name: 'Unidad de Prueba 4',
    type: 'unidad_subdependiente',
    description: 'Unidad subdependiente de prueba',
    logo: 'https://example.com/logo4.png',
    responsible: 'María Gómez',
    depends_on: '',
    unitTypeId: unitType.id,
    intermediatePositionId: intermediatePosition.id,
    administrativeRegularPositionUnitId: administrativeRegularPositionUnit.id,
    parentUnitId: '',
  });

  await app.close();
}

seedUnits();
