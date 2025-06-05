import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    const newPerson = this.personRepository.create(createPersonDto);
    return await this.personRepository.save(newPerson);
  }

  async findAll(): Promise<Person[]> {
    return await this.personRepository.find({
      relations: ['student', 'professor', 'administrative', 'organizationPersons'],
    });
  }

async findOneFlexible(search: string): Promise<Person> {
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
    return this.findOneFlexible(id);
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