import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async create(dto: CreateStudentDto): Promise<Student> {
    const student = this.studentRepo.create(dto);
    return await this.studentRepo.save(student);
  }

  async findAll(): Promise<Student[]> {
    return await this.studentRepo.find({
      relations: ['person'],
    });
  }

  async findOne(ru: number): Promise<Student> {
    const student = await this.studentRepo.findOne({
      where: { ru },
      relations: ['person'],
    });

    if (!student) {
      throw new NotFoundException(`No se encontró Student con RU ${ru}`);
    }

    return student;
  }

  async update(ru: number, dto: UpdateStudentDto): Promise<Student> {
    await this.studentRepo.update(ru, dto);
    return this.findOne(ru);
  }

  async remove(ru: number): Promise<void> {
    await this.studentRepo.delete(ru);
  }
}
