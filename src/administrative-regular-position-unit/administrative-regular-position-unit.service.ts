import { Injectable } from '@nestjs/common';
import { CreateAdministrativeRegularPositionUnitDto } from './dto/create-administrative-regular-position-unit.dto';
import { UpdateAdministrativeRegularPositionUnitDto } from './dto/update-administrative-regular-position-unit.dto';

@Injectable()
export class AdministrativeRegularPositionUnitService {
  create(createAdministrativeRegularPositionUnitDto: CreateAdministrativeRegularPositionUnitDto) {
    return 'This action adds a new administrativeRegularPositionUnit';
  }

  findAll() {
    return `This action returns all administrativeRegularPositionUnit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} administrativeRegularPositionUnit`;
  }

  update(id: number, updateAdministrativeRegularPositionUnitDto: UpdateAdministrativeRegularPositionUnitDto) {
    return `This action updates a #${id} administrativeRegularPositionUnit`;
  }

  remove(id: number) {
    return `This action removes a #${id} administrativeRegularPositionUnit`;
  }
}
