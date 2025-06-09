import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { IntermediatePositionService } from './intermediate-position.service';
async function seedIntermediatePositions() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(IntermediatePositionService);

  // Inserta varias posiciones intermedias de prueba
  await service.create({
    name: 'Coordinador Académico',
    description: 'Responsable de la coordinación académica',
   hierachical_level: 'Alto',
   unit_id: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0' // Reemplaza con un ID de unidad válido
  });
  await service.create({
    name: 'Jefe de Laboratorio',
    description: 'Encargado del laboratorio principal',
    hierachical_level: 'Medio',
    unit_id: 'b2c3d4e5-f6a1-8901-2345-6789abcdef01' // Reemplaza con un ID de unidad válido
  })
  await service.create({
    name: 'Supervisor de Prácticas',
    description: 'Supervisa las prácticas estudiantiles',
    hierachical_level: 'Bajo',
    unit_id: 'c3d4e5f6-a1b2-9012-3456-789abcdef012' // Reemplaza con un ID de unidad válido
  });
  await service.create({
    name: 'Asistente de Coordinación',
    description: 'Asiste en la coordinación de actividades',
    hierachical_level: 'Bajo',
    unit_id: 'd4e5f6a1-b2c3-9012-3456-789abcdef012' // Reemplaza con un ID de unidad válido
  });

  await app.close();
}

seedIntermediatePositions();