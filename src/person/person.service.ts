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

async findOne(id: string): Promise<Person> { // Lanzar una excepción si no se encuentra
  const person = await this.personRepository.findOne({
    where: { id },
    relations: ['student', 'professor', 'administrative', 'organizationPersons'],
  });
  if (!person) {
    throw new NotFoundException(`Person with id ${id} not found`);
  }
  return person;
}

  async update(id: string, updatePersonDto: UpdatePersonDto): Promise<Person> {
    await this.personRepository.update(id, updatePersonDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.personRepository.delete(id);
  }
}