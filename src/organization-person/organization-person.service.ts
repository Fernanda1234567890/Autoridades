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
  seedOrganizationPersonData: any = [
    {
      id: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
      organization_id: 'org-uuid-1', // Debe existir en Organization
      person_id: 'person-uuid-1',    // Debe existir en Person
      role: 'Director',
      startDate: new Date('2023-01-01'),
      endDate: null,
    },
    {
      id: 'b2c3d4e5-f6a1-8901-2345-6789abcdef01',
      organization_id: 'org-uuid-2',
      person_id: 'person-uuid-2',
      role: 'Miembro',
      startDate: new Date('2023-02-01'),
      endDate: null,
    }
  ];

  constructor(
    @InjectRepository(OrganizationPerson)
    private organizationPersonRepository: Repository<OrganizationPerson>,

    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,

    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}


async create(createDto: CreateOrganizationPersonDto): Promise<OrganizationPerson> {
  const org = await this.organizationRepository.findOne({ where: { id: createDto.organization_id } });
  const person = await this.personRepository.findOne({ where: { id: createDto.person_id } });

  if (!org) throw new NotFoundException('Organization not found');
  if (!person) throw new NotFoundException('Person not found');

  const orgPerson = this.organizationPersonRepository.create({
    ...createDto,
    organization: org,
    person: person,
  });
  return this.organizationPersonRepository.save(orgPerson);
}

async seed(): Promise<OrganizationPerson[]> {
  const promiseMapped = this.seedOrganizationPersonData.map(async (data) => {
    const org = await this.organizationRepository.findOne({ where: { id: data.organization_id } });
    const person = await this.personRepository.findOne({ where: { id: data.person_id } });
    if (!org || !person) return null;
    const orgPerson = this.organizationPersonRepository.create({
      ...data,
      organization: org,
      person: person,
    });
    return this.organizationPersonRepository.save(orgPerson);
  });
  return (await Promise.all(promiseMapped)).filter(Boolean);
}

  async findAll(): Promise<OrganizationPerson[]> {
    return await this.organizationPersonRepository.find({
      relations: ['organization', 'person'],
    });
  }

  async findOne(id: string): Promise<OrganizationPerson> {
    const orgPerson = await this.organizationPersonRepository.findOne({
      where: { id },
      relations: ['organization', 'person'],
    });
    if (!orgPerson) {
      throw new NotFoundException(`OrganizationPerson with ID "${id}" not found`);
    }
    return orgPerson;
  }

  async update(id: string, updateDto: UpdateOrganizationPersonDto): Promise<OrganizationPerson> {
    await this.organizationPersonRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.organizationPersonRepository.delete(id);
  }
}
