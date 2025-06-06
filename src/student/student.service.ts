import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Person } from 'src/person/entities/person.entity';

@Injectable()
export class StudentService {
  
  seedStudentData: any  =  [
  {
    career: 'Ingeniería de Sistemas',
    person_id: 'Juan',
  },
  {
    career: 'Derecho',
    person_id: 'Ana',
  },
  {
    career: 'Medicina',
    person_id: 'Carlos',
  },
  {
    career: 'Arquitectura',
    person_id: 'María',
  }
];
  
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Person)
    private readonly personRepo: Repository<Person>,
  ) {}


  async create(dto: CreateStudentDto): Promise<Student> {
    const student = this.studentRepo.create(dto);
    return await this.studentRepo.save(student);
  }

  // Método para insertar varios estudiantes de prueba
  async seed(): Promise<Student[]> {
      const dataMapped = this.seedStudentData.map((student)=>{
        return {
          ...student,
          
          person: this.personRepo.create({ name: student.person_id }), // Asumiendo que person_id es un UUID válido
        };
      })


      const created = this.seedStudentData.map(dto => this.studentRepo.create(dto));
      return await this.studentRepo.save(created);
  }

async findAll(): Promise<Student[]> {
  return this.studentRepo.find({
    relations: [
      'person', // Relación ManyToOne o OneToOne con la entidad Person
    ],
  });
}

async findOne(options: { ru?: number; career?: string; person_id?: string }): Promise<Student> {
  const student = await this.studentRepo.findOne({
    where: options,
    relations: [
      'person', // Relación con la entidad Person
    ],
  });
  if (!student) {
    throw new NotFoundException(
      `Student not found with criteria: ${JSON.stringify(options)}`
    );
  }
  return student;
}


  async update(ru: number, dto: UpdateStudentDto): Promise<Student> {
    await this.studentRepo.update({ ru }, dto);
    return this.findOne({ru});
  }

  async remove(ru: number): Promise<void> {
    await this.studentRepo.delete({ ru });
  }
}