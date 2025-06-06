import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UnitTypeService } from './unit-type.service';

async function seedUnitTypes() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(UnitTypeService);

  const data = [
    { name: 'Unidad Mayor', description: 'Unidad de mayor jerarquía', type: 'unidad_mayor' },
    { name: 'Unidad Intermedia', description: 'Unidad de nivel intermedio', type: 'unidad_intermedia' },
    { name: 'Unidad Subdependiente', description: 'Unidad subordinada a otra', type: 'unidad_subdependiente' },
  ];

  for (const item of data) {
    try {
      await service.create(item);
      console.log(`Insertado: ${item.name}`);
    } catch (e) {
      console.error(`Error insertando ${item.name}:`, e.message);
    }
  }
  await app.close();
}

seedUnitTypes();
