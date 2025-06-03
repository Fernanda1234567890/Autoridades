import { Injectable } from '@nestjs/common';
import { CreateRegularPositionDto } from './dto/create-regular-position.dto';
import { UpdateRegularPositionDto } from './dto/update-regular-position.dto';

@Injectable()
export class RegularPositionService {
  create(createRegularPositionDto: CreateRegularPositionDto) {
    return 'This action adds a new regularPosition';
  }

  findAll() {
    return `This action returns all regularPosition`;
  }

  findOne(id: number) {
    return `This action returns a #${id} regularPosition`;
  }

  update(id: number, updateRegularPositionDto: UpdateRegularPositionDto) {
    return `This action updates a #${id} regularPosition`;
  }

  remove(id: number) {
    return `This action removes a #${id} regularPosition`;
  }
}
