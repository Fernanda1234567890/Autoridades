import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './entities/organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationService {
  seedOrganizationData: any = [
    {
      name: 'Organización Alpha',
      description: 'Organización principal',
      type: 'principal',
    },
    {
      name: 'Organización Beta',
      description: 'Organización secundaria',
      type: 'secundaria',
    }
  ];

  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async create(createDto: CreateOrganizationDto): Promise<Organization> {
    const org = this.organizationRepository.create(createDto);
    return this.organizationRepository.save(org);
  }

  async seed(): Promise<Organization[]> {
    const promiseMapped = this.seedOrganizationData.map(async (orgData) => {
      const org = this.organizationRepository.create(orgData);
      return this.organizationRepository.save(org);
    });
    return await Promise.all(promiseMapped);
  }

  async findAll(): Promise<Organization[]> { //Busca todas las organizaciones en la base de datos.
    return await this.organizationRepository.find({
      relations: ['organizationPersons'], 
    });
  }

  async findOne(id: string): Promise<Organization> { //busca por id
    const organization = await this.organizationRepository.findOne({
      where: { id },
      relations: ['organizationPersons'], 
    });

    if (!organization) {
      throw new NotFoundException(`Organization with ID "${id}" not found`);
    }

    return organization;
  }

  async update(id: string, updateDto: UpdateOrganizationDto): Promise<Organization> {
    await this.organizationRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.organizationRepository.delete(id);
  }
}
