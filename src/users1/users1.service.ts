import { Injectable } from '@nestjs/common';
import { CreateUsers1Dto } from './dto/create-users1.dto';
import { UpdateUsers1Dto } from './dto/update-users1.dto';

@Injectable()
export class Users1Service {
  create(createUsers1Dto: CreateUsers1Dto) {
    return 'This action adds a new users1';
  }

  findAll() {
    return `This action returns all users1`;
  }

  findOne(id: number) {
    return `This action returns a #${id} users1`;
  }

  update(id: number, updateUsers1Dto: UpdateUsers1Dto) {
    return `This action updates a #${id} users1`;
  }

  remove(id: number) {
    return `This action removes a #${id} users1`;
  }
}
