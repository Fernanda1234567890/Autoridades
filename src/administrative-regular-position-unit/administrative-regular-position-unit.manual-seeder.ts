import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AdministrativeRegularPositionUnitService } from './administrative-regular-position-unit.service';
import { RegularPosition } from '../regular-position/entities/regular-position.entity';
import { Unit } from '../unit/entities/unit.entity';
import { Administrative } from '../administrative/entities/administrative.entity';
import { Repository } from 'typeorm';


async function seedAdministrativeRegularPositionUnits() {
  const app = await NestFactory.createApplicationContext(AppModule);
 // const service = app.get(AdministrativeRegularPositionUnitService);

// Obtén los repositorios de las entidades relacionadas
  const regularPositionRepo = app.get<Repository<RegularPosition>>('RegularPositionRepository');
  const unitRepo = app.get<Repository<Unit>>('UnitRepository');
  const administrativeRepo = app.get<Repository<Administrative>>('AdministrativeRepository');
  const service = app.get(AdministrativeRegularPositionUnitService);

  // Busca o crea los registros necesarios
  const regularPosition = await regularPositionRepo.findOne({ where: { id: 'IdRegularPosition' } });
  const unit = await unitRepo.findOne({ where: { name: 'NombreUnit' } });
  const administrative = await administrativeRepo.findOne({ where: { id : 'IdAdministrative' } });

  // Asegúrate de que los registros existen antes de continuar
  if (!regularPosition || !unit || !administrative) {
    console.error('Faltan registros relacionados. Crea primero RegularPosition, Unit y Administrative.');
    await app.close();
    return;
  }

  // Inserta varias unidades administrativas de prueba
  await service.create({
      regular_position_id: regularPosition.id ,
      units_id: unit.id,
      administrative_id: administrative.id,    // Reemplaza con un UUID válido
    entry_date: new Date('2023-01-01'),
  });
  await service.create({
      regular_position_id: regularPosition.id ,
      units_id: unit.id,
      administrative_id: administrative.id,
    entry_date: new Date('2023-02-01'),
  });
  await service.create({
      regular_position_id: regularPosition.id ,
      units_id: unit.id,
      administrative_id: administrative.id,
    entry_date: new Date('2023-03-01'),
  });
  await service.create({
      regular_position_id: regularPosition.id ,
      units_id: unit.id,
      administrative_id: administrative.id,
    entry_date: new Date('2023-04-01'),
  });

  await app.close();
}

seedAdministrativeRegularPositionUnits();