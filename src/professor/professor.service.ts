import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professor } from './entities/professor.entity';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(Professor)
    private readonly professorRepo: Repository<Professor>,
  ) {}

  async create(dto: CreateProfessorDto): Promise<Professor> {
    const professor = this.professorRepo.create(dto);
    return await this.professorRepo.save(professor);
  }

  async findAll(): Promise<Professor[]> {
    return await this.professorRepo.find({
      relations: ['person'],
    });
  }

  async findOne(id: string): Promise<Professor> {
    const professor = await this.professorRepo.findOne({
      where: { id },
      relations: ['person'],
    });

    if (!professor) {
      throw new NotFoundException(`No se encontró Professor con ID ${id}`);
    }

    return professor;
  }

  async update(id: string, dto: UpdateProfessorDto): Promise<Professor> {
    await this.professorRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.professorRepo.delete(id);
  }
}