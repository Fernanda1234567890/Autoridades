import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Administrative } from './entities/administrative.entity';
import { CreateAdministrativeDto } from './dto/create-administrative.dto';
import { UpdateAdministrativeDto } from './dto/update-administrative.dto';

@Injectable()
export class AdministrativeService {
  
  seedAdministrativeData: any = [
    {
      area: 'Recursos Humanos',
      person_id: '',
    },
    {
      area: 'Finanzas',
      person_id: '',
    },
    {
      area: 'Infraestructura',
      person_id: '',
    },
    {
      area: 'Secretaría',
      person_id: '',
    }
  ];
  
  constructor(
    @InjectRepository(Administrative)
    private readonly administrativeRepo: Repository<Administrative>,
  ) {}

  async create(dto: CreateAdministrativeDto): Promise<Administrative> {
    const administrative = this.administrativeRepo.create(dto);
    return await this.administrativeRepo.save(administrative);
  }

  // Método para insertar varios administrativos de prueba
  async seed(): Promise<Administrative[]> {
    const created = this.seedAdministrativeData.map(dto => this.administrativeRepo.create(dto));
    return await this.administrativeRepo.save(created);
  }

  async findAll(): Promise<Administrative[]> {
    return this.administrativeRepo.find({
      relations: [
        'person', // Relación ManyToOne o OneToOne con la entidad Person
      ],
    });
  }

  async findOne(options: { id?: string; area?: string; person_id?: string }): Promise<Administrative> {
    const administrative = await this.administrativeRepo.findOne({
      where: options,
      relations: [
        'person', // Relación con la entidad Person
      ],
    });
    if (!administrative) {
      throw new NotFoundException(
        `Administrative not found with criteria: ${JSON.stringify(options)}`
      );
    }
    return administrative;
  }

  async update(id: string, dto: UpdateAdministrativeDto): Promise<Administrative> {
    await this.administrativeRepo.update({ id }, dto);
    return this.findOne({ id });
  }

  async remove(id: string): Promise<void> {
    await this.administrativeRepo.delete({ id });
  }
}