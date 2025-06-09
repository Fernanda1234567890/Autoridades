import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonService {
seedPersonData: any = [
  {
    name: 'Juan',
    last_name: 'Pérez',
    ci: '5071789',
    phone_number: 19345678,
    address: 'Calle 1',
    date_of_birth: new Date('1990-01-02'),
    image: 'https://example.com/image1.png',
    type: 'docente',
    email: 'juan.perez@example.com'
  },
  {
    name: 'Ana',
    last_name: 'López',
    ci: '6611094',
    phone_number: 12345678,
    address: 'Calle alba',
    date_of_birth: new Date('1990-01-09'),
    image: 'https://example.com/image2.png',
    type: 'estudiante',
    email: 'ana.lopez@example.com'
  },
  {
    name: 'Carlos',
    last_name: 'Ruiz',
    ci: '3681459',
    phone_number: 12340678,
    address: 'Calle 98',
    date_of_birth: new Date('1990-01-07'),
    image: 'https://example.com/image3.png',
    type: 'administrativo',
    email: 'carlos.ruiz@example.com'
  },
  {
    name: 'María',
    last_name: 'Gómez',
    ci: '7894563',
    phone_number: 12345678,
    address: 'Calle 1589',
    date_of_birth: new Date('1990-01-26'),
    image: 'https://example.com/image4.png',
    type: 'docente',
    email: 'maria.gomez@example.com'
  }
];

  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    const newPerson = this.personRepository.create(createPersonDto);
    return await this.personRepository.save(newPerson);
  }

  // En person.service.ts
  async seed(): Promise<Person[]> {
    const created = this.seedPersonData.map(dto => this.personRepository.create(dto));
    return await this.personRepository.save(created);
  }

  async findAll(): Promise<Person[]> {
    return await this.personRepository.find({
      relations: ['student', 'professor', 'administrative', 'organizationPersons'],
    });
  }

async findOne(search: string): Promise<Person> {
  const person = await this.personRepository
    .createQueryBuilder('person')
    .leftJoinAndSelect('person.student', 'student')
    .leftJoinAndSelect('person.professor', 'professor')
    .leftJoinAndSelect('person.administrative', 'administrative')
    .leftJoinAndSelect('person.organizationPersons', 'organizationPersons')
    .where('person.id = :search', { search })
    .orWhere('person.name = :search', { search })
    .orWhere('person.last_name = :search', { search })
    .orWhere('person.ci = :search', { search })
    .getOne();

  if (!person) {
    throw new NotFoundException(`No person found with id, name, last name or CI '${search}'`);
  }

  return person;
}


  async update(id: string, updatePersonDto: UpdatePersonDto): Promise<Person> {
    await this.personRepository.update(id, updatePersonDto);
    return this.findOne(id);
  }

  async remove(identifier: string): Promise<void> {
    let person;

    // Primero intenta buscar por id
    person = await this.personRepository.findOne({ where: { id: identifier } });

    // Si no encuentra por id, intenta buscar por ci
    if (!person) {
      person = await this.personRepository.findOne({ where: { ci: identifier } });
    }

    // Si aún no encuentra, lanza error
    if (!person) {
      throw new NotFoundException(`No person found with id or CI '${identifier}'`);
    }

    await this.personRepository.delete(person.id);
  }
}