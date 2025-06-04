import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationPerson } from './entities/organization-person.entity';
import { CreateOrganizationPersonDto } from './dto/create-organization-person.dto';
import { UpdateOrganizationPersonDto } from './dto/update-organization-person.dto';
import { Organization } from 'src/organization/entities/organization.entity';
import { Person } from 'src/person/entities/person.entity';

@Injectable()
export class OrganizationPersonService {
  constructor(
    @InjectRepository(OrganizationPerson)
    private readonly orgPersonRepo: Repository<OrganizationPerson>,
  ) {}

  async create(dto: CreateOrganizationPersonDto): Promise<OrganizationPerson> {
    const orgPerson = this.orgPersonRepo.create(dto);
    return await this.orgPersonRepo.save(orgPerson);
  }

  async findAll(): Promise<OrganizationPerson[]> {
    return await this.orgPersonRepo.find({
      relations: ['organization', 'person'],
    });
  }

  async findOne(id: string): Promise<OrganizationPerson> {
    const entity = await this.orgPersonRepo.findOne({
      where: { id },
      relations: ['organization', 'person'],
    });

    if (!entity) {
      throw new NotFoundException(`No se encontró OrganizationPerson con ID ${id}`);
    }

    return entity;
  }

  async update(id: string, dto: UpdateOrganizationPersonDto): Promise<OrganizationPerson> {
    await this.orgPersonRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.orgPersonRepo.delete(id);
  }
}
