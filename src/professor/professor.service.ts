import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professor } from './entities/professor.entity';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Injectable()
export class ProfessorService {
  
  seedProfessorData: any = [
    {
      department: 'Ingeniería de Sistemas',
      person_id: '',
    },
    {
      department: 'Derecho',
      person_id: '',
    },
    {
      department: 'Medicina',
      person_id:  '',
    },
    {
      department: 'Arquitectura',
      person_id: '',
    }
  ];
  
  constructor(
    @InjectRepository(Professor)
    private readonly professorRepo: Repository<Professor>,
  ) {}

  async create(dto: CreateProfessorDto): Promise<Professor> {
    const professor = this.professorRepo.create(dto);
    return await this.professorRepo.save(professor);
  }

  // Método para insertar varios profesores de prueba
  async seed(): Promise<Professor[]> {
    const created = this.seedProfessorData.map(dto => this.professorRepo.create(dto));
    return await this.professorRepo.save(created);
  }

  async findAll(): Promise<Professor[]> {
    return this.professorRepo.find({
      relations: [
        'person', // Relación ManyToOne o OneToOne con la entidad Person
      ],
    });
  }

  async findOne(options: { id?: string; department?: string; person_id?: string }): Promise<Professor> {
    const professor = await this.professorRepo.findOne({
      where: options,
      relations: [
        'person', // Relación con la entidad Person
      ],
    });
    if (!professor) {
      throw new NotFoundException(
        `Professor not found with criteria: ${JSON.stringify(options)}`
      );
    }
    return professor;
  }

  async update(id: string, dto: UpdateProfessorDto): Promise<Professor> {
    await this.professorRepo.update({ id }, dto);
    return this.findOne({ id });
  }

  async remove(id: string): Promise<void> {
    await this.professorRepo.delete({ id });
  }
}