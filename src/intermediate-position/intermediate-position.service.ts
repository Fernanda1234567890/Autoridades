import { Injectable } from '@nestjs/common';
import { CreateIntermediatePositionDto } from './dto/create-intermediate-position.dto';
import { UpdateIntermediatePositionDto } from './dto/update-intermediate-position.dto';

@Injectable()
export class IntermediatePositionService {
  create(createIntermediatePositionDto: CreateIntermediatePositionDto) {
    return 'This action adds a new intermediatePosition';
  }

  findAll() {
    return `This action returns all intermediatePosition`;
  }

  findOne(id: number) {
    return `This action returns a #${id} intermediatePosition`;
  }

  update(id: number, updateIntermediatePositionDto: UpdateIntermediatePositionDto) {
    return `This action updates a #${id} intermediatePosition`;
  }

  remove(id: number) {
    return `This action removes a #${id} intermediatePosition`;
  }
}
