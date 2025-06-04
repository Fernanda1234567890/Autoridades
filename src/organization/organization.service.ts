import { Injectable, NotFoundException } from '@nestjs/common'; // el notF... regresa error 404 cuando no encuentra el registro
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './entities/organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationService {
  constructor( // inyecta el repo para que se pueda ejecutar find, create, save , delete.
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async create(createDto: CreateOrganizationDto): Promise<Organization> {
    const organization = this.organizationRepository.create(createDto);
    return await this.organizationRepository.save(organization);
  }

  async findAll(): Promise<Organization[]> { //Busca todas las organizaciones en la base de datos.
    return await this.organizationRepository.find({
      relations: ['organizationPerson'], 
    });
  }

  async findOne(id: string): Promise<Organization> { //busca por id
    const organization = await this.organizationRepository.findOne({
      where: { id },
      relations: ['organizationPerson'], 
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
