import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegularPosition } from './entities/regular-position.entity';
import { CreateRegularPositionDto } from './dto/create-regular-position.dto';
import { UpdateRegularPositionDto } from './dto/update-regular-position.dto';

@Injectable()
export class RegularPositionService {

    seedRegularPositionData: any = [
    {
      id: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
      name: 'Jefe de Departamento',
      description: 'Responsable del área de sistemas',
      hierachical_level: 'Alto',
    },
    {
      id: 'b2c3d4e5-f6a1-8901-2345-6789abcdef01',
      name: 'Analista',
      description: 'Analiza procesos y sistemas',  
      hierachical_level: 'Medio',
    },
    {
      id: 'c3d4e5f6-a1b2-9012-3456-789abcdef012',
      name: 'Asistente',
      description: 'Asiste en tareas administrativas',
      hierachical_level: 'Bajo',
    }
  ];

  constructor(
    @InjectRepository(RegularPosition)
    private readonly regularPositionRepository: Repository<RegularPosition>,
  ) {}

  async create(createDto: CreateRegularPositionDto): Promise<RegularPosition> {
    const position = this.regularPositionRepository.create(createDto);
    return await this.regularPositionRepository.save(position);
  } //crea y guarda una nueva instancia 

    async seed(): Promise<RegularPosition[]> {
    const promiseMapped = this.seedRegularPositionData.map(async (positionData) => {
      const position = this.regularPositionRepository.create(positionData);
      return this.regularPositionRepository.save(position);
    });

    return await Promise.all(promiseMapped);
  }

  async findAll(): Promise<RegularPosition[]> {
    return await this.regularPositionRepository.find({
      relations: ['administrativeRegularPositionUnits'], // si tienes relaciones, cámbialo//////////
    });
  } //Recupera todos los RegularPosition.

  async findOne(id: string): Promise<RegularPosition> { //Busca el registro por ID.
    const position = await this.regularPositionRepository.findOne({
      where: { id },
      relations: ['administrativeRegularPositionUnit'], // ajusta según relaciones
    });
    if (!position) {
      throw new NotFoundException(`RegularPosition with ID "${id}" not found`);
    }
    return position;
  }

  async update(id: string, updateDto: UpdateRegularPositionDto): Promise<RegularPosition> {
    await this.regularPositionRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.regularPositionRepository.delete(id);
  }
}