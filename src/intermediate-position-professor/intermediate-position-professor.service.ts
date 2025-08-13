import { Injectable } from '@nestjs/common';
import { CreateIntermediatePositionProfessorDto } from './dto/create-intermediate-position-professor.dto';
import { UpdateIntermediatePositionProfessorDto } from './dto/update-intermediate-position-professor.dto';

@Injectable()
export class IntermediatePositionProfessorService {
  create(createIntermediatePositionProfessorDto: CreateIntermediatePositionProfessorDto) {
    return 'This action adds a new intermediatePositionProfessor';
  }

  findAll() {
    return `This action returns all intermediatePositionProfessor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} intermediatePositionProfessor`;
  }

  update(id: number, updateIntermediatePositionProfessorDto: UpdateIntermediatePositionProfessorDto) {
    return `This action updates a #${id} intermediatePositionProfessor`;
  }

  remove(id: number) {
    return `This action removes a #${id} intermediatePositionProfessor`;
  }
}
