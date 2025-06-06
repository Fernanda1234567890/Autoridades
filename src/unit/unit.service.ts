import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { UnitType } from 'src/unit-type/entities/unit-type.entity';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Injectable()
export class UnitService {

  seedUnitData: any = [
    {
      id: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
      name: 'Unidad de Prueba 1',
      type: 'unidad_mayor',
      description: 'Esta es una unidad de prueba',
      logo: 'https://example.com/logo1.png',
      responsible: 'Juan Pérez',
      depends_on: null, // <--- null en vez de ''
      unitType: 'Unidad Intermedia',
    },
    {
      id: 'b2c3d4e5-f6a1-8901-2345-6789abcdef01',
      name: 'Unidad de Prueba 2',
      type: 'unidad_mayor',
      description: 'Esta es una unidad de prueba',
      logo: 'https://example.com/logo2.png',
      responsible: 'Ana López',
      depends_on: null,
      unitType: 'Unidad Mayor',
    },
    {
      id: 'c3d4e5f6-a1b2-9012-3456-789abcdef012',
      name: 'Unidad de Prueba 3',
      type: 'unidad_intermedia',
      description: 'Unidad intermedia de prueba',
      logo: 'https://example.com/logo3.png',
      responsible: 'Carlos Ruiz',
      depends_on: null,
      unitType: 'Unidad Intermedia',
    },
    {
      id: 'd4e5f6a1-b2c3-0123-4567-89abcdef0123',
      name: 'Unidad de Prueba 4',
      type: 'unidad_subdependiente',
      description: 'Unidad subdependiente de prueba',
      logo: 'https://example.com/logo4.png',
      responsible: 'María Gómez',
      depends_on: null,
      unitType: 'Unidad Subdependiente',
    }
];



  constructor(
    @InjectRepository(Unit)
    private unitRepository: Repository<Unit>,

    @InjectRepository(UnitType)
    private unitTypeRepository: Repository<UnitType>,
    
  ) {}

  async create(createUnitDto: CreateUnitDto): Promise<Unit> {
    const unit = this.unitRepository.create(createUnitDto);
    return this.unitRepository.save(unit);
  }


  async seed ():  Promise<Unit[]>  {
    const dataMapped = this.seedUnitData.map( unitData => {

      const unitTypeResponse = this.unitTypeRepository.findOne({
        where: { name: unitData.unitType },
        relations: ['units'], // Asegúrate de que la relación esté bien definida
      });

      return {
        ...unitData,
        unitType: unitTypeResponse,
      }

    });
    
    const promiseMapped = dataMapped.map(async (unitData) => {
      const unit = this.unitRepository.create(unitData);
      console.log(unit)
      return this.unitRepository.save(unit);
    })

    const res = await Promise.all(promiseMapped)

    return res; // Aquí deberías implementar la lógica para insertar las unidades de prueba
  }

  async findAll(): Promise<Unit[]> {
    return this.unitRepository.find({
      relations: [
        'unitType', // Relación ManyToOne
        'intermediatePosition', // Relación OneToOne
        'administrativeRegularPositionUnit', // Relación OneToOne
        'parentUnit', // Si maneja jerarquía
        'subunits',   // Si maneja jerarquía inversa
      ],
    });
  }

async findOne(options: { id?: string; name?: string; type?: string }): Promise<Unit> {
  const unit = await this.unitRepository.findOne({
    where: options,
    relations: [
      'unitType',
      'intermediatePosition',
      'administrativeRegularPositionUnit',
      'parentUnit',
      'subunits',
    ],
  });
  if (!unit) {
    throw new NotFoundException(
      `Unit not found with criteria: ${JSON.stringify(options)}`
    );
  }
  return unit;
}

  async update(id: string, updateUnitDto: UpdateUnitDto): Promise<Unit> {
    await this.unitRepository.update(id, updateUnitDto);
    return this.findOne({ id });
  }

  async remove(id: string): Promise<void> {
    await this.unitRepository.delete(id);
  }
}




