import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdministrativoDto } from './dto/create-administrativo.dto';
import { UpdateAdministrativoDto } from './dto/update-administrativo.dto';
import { Repository } from 'typeorm';
import { Administrativo } from './entities/administrativo.entity';

@Injectable()
export class AdministrativoService {
  constructor(
    @Inject('AdministrativoRepository')
    private readonly administrativoRepository: Repository<Administrativo>
  ) { }
  async create(createAdministrativoDto: CreateAdministrativoDto) {
    const nuevoAdministrativo = this.administrativoRepository.create(createAdministrativoDto);
    return await this.administrativoRepository.save(nuevoAdministrativo)
  }

  async findAll() {
    const administrativo = await this.administrativoRepository.find({ relations: ['persona', 'administrativo_cargo_regular_unidades', 'administrativo_cargo_regular_unidades.cargo_regular', 'administrativo_cargo_regular_unidades.unidad'] })
    console.log (administrativo)
    return administrativo.map((administrativo) => ({
      ...administrativo,
      persona: {
        nombres: administrativo.persona.nombres,
        apellidos: administrativo.persona.apellidos
      },
      administrativo_cargo_regular_unidades: administrativo.administrativo_cargo_regular_unidades
        .filter((acru)=>acru.fecha_fin === null)?.map((acru)=>({
          cargo: acru.cargo_regular.nombre,
          unidad: acru.unidad.nombre,    
        }))[0],
    }))

  }
  async seed() {

    //await this.administrativoRepository.query(`TRUNCATE TABLE administrativo CASCADE`);
    //await this.administrativoRepository.clear()
    //await this.administrativoRepository.query(`ALTER SEQUENCE administrativo_id_seq RESTART WITH 1`)
    const datos: CreateAdministrativoDto[] = [
      {
        id: 1,
        id_persona: 4,
        estado: true,
      },
      {
        id: 2,
        id_persona: 3,
        estado: true,
      }
    ]

    const mapeados = datos.map((e) => this.administrativoRepository.create(e))
    return await this.administrativoRepository.save(mapeados)
  }

  async findOne(id: number) {
    const administrativo = await this. administrativoRepository.findOne ({
      where: { id },
      relations: ['administrativos']
    });
    if(!administrativo){
      throw new NotFoundException(`administrativo con id ${id} no encontrado`);
    }
    return administrativo;
  }

// Búsqueda avanzada con filtros opcionales
  async search(params: { nombres?: string; apellidos?: string }) {
    const query = this.administrativoRepository
      .createQueryBuilder('administrativo')
      .leftJoinAndSelect('administrativo.persona', 'persona');

    if (params.nombres) {
      query.andWhere('LOWER(persona.nombres) LIKE :nombres', { nombres: `%${params.nombres.toLowerCase()}%` });
    }

    if (params.apellidos) {
      query.andWhere('LOWER(persona.apellidos) LIKE :apellidos', { apellidos: `%${params.apellidos.toLowerCase()}%` });
    }

    return await query.getMany();
  }
  async update(id: number, updateAdministrativoDto: UpdateAdministrativoDto) {
    const administrativo = await this.findOne(id);
    Object.assign(administrativo, updateAdministrativoDto);
    return await this.administrativoRepository.save(administrativo);
  }

  remove(id: number) {
    return `This action removes a #${id} administrativo`;
  }
}
