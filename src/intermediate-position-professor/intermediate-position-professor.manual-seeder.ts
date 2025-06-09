import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { IntermediatePositionProfessorService } from './intermediate-position-professor.service';

async function seedIntermediatePositionProfessors() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(IntermediatePositionProfessorService);

  // Inserta varias relaciones de prueba entre posición intermedia y profesor
  await service.create({
    regular_position_id: 'regular-position-uuid-1', // Reemplaza con un UUID válido
    unit_id: 1,                                     // Ajusta según tu modelo (number o string)
    administrative_id: 1,                           // Ajusta según tu modelo
    entry_date: new Date('2023-01-01'),
    intermediate_position_id: 'intermediate-position-uuid-1', // Reemplaza con un UUID válido
    professor_id: 'professor-uuid-1',                          // Reemplaza con un UUID válido
  });
  await service.create({
    regular_position_id: 'regular-position-uuid-2',
    unit_id: 2,
    administrative_id: 2,
    entry_date: new Date('2023-02-01'),
    intermediate_position_id: 'intermediate-position-uuid-2',
    professor_id: 'professor-uuid-2',
  });
  await service.create({
    regular_position_id: 'regular-position-uuid-3',
    unit_id: 3,
    administrative_id: 3,
    entry_date: new Date('2023-03-01'),
    intermediate_position_id: 'intermediate-position-uuid-3',
    professor_id: 'professor-uuid-3',
  });
  await service.create({
    regular_position_id: 'regular-position-uuid-4',
    unit_id: 4,
    administrative_id: 4,
    entry_date: new Date('2023-04-01'),
    intermediate_position_id: 'intermediate-position-uuid-4',
    professor_id: 'professor-uuid-4',
  });

  await app.close();
}

seedIntermediatePositionProfessors();