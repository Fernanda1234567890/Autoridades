import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from './entities/student.entity';
import { Person } from 'src/person/entities/person.entity';

@Module({
  
  imports: [TypeOrmModule.forFeature([
    Student, 
    Person
  ])],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [TypeOrmModule], // Opcional, solo si necesitas el repositorio fuera de este módulo
})
export class StudentModule {}