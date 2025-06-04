import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Administrative } from './entities/administrative.entity';
import { CreateAdministrativeDto } from './dto/create-administrative.dto';
import { UpdateAdministrativeDto } from './dto/update-administrative.dto';

@Injectable()
export class AdministrativeService {
  constructor(
    @InjectRepository(Administrative)
    private readonly adminRepo: Repository<Administrative>,
  ) {}

  async create(dto: CreateAdministrativeDto): Promise<Administrative> {
    const administrative = this.adminRepo.create(dto);
    return await this.adminRepo.save(administrative);
  }

  async findAll(): Promise<Administrative[]> {
    return await this.adminRepo.find({
      relations: ['person'],
    });
  }

  async findOne(id: string): Promise<Administrative> {
    const admin = await this.adminRepo.findOne({
      where: { id },
      relations: ['person'],
    });

    if (!admin) {
      throw new NotFoundException(`No se encontró Administrative con ID ${id}`);
    }

    return admin;
  }

  async update(id: string, dto: UpdateAdministrativeDto): Promise<Administrative> {
    await this.adminRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.adminRepo.delete(id);
  }
}
