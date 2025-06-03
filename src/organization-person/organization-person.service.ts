import { Injectable } from '@nestjs/common';
import { CreateOrganizationPersonDto } from './dto/create-organization-person.dto';
import { UpdateOrganizationPersonDto } from './dto/update-organization-person.dto';

@Injectable()
export class OrganizationPersonService {
  create(createOrganizationPersonDto: CreateOrganizationPersonDto) {
    return 'This action adds a new organizationPerson';
  }

  findAll() {
    return `This action returns all organizationPerson`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizationPerson`;
  }

  update(id: number, updateOrganizationPersonDto: UpdateOrganizationPersonDto) {
    return `This action updates a #${id} organizationPerson`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizationPerson`;
  }
}
