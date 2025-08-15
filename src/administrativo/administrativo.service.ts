import { Inject, Injectable } from '@nestjs/common';
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
    const administrativos = await this.administrativoRepository.find({ relations: ['persona'] })
    return administrativos.map((administrativo) => ({
      ...administrativos,
      persona: {
        nombres: administrativo.persona.nombres,
        apellidos: administrativo.persona.apellidos
      }
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
      },
      {
        id: 2,
        id_persona: 3
      }
    ]

    const mapeados = datos.map((e) => this.administrativoRepository.create(e))
    return await this.administrativoRepository.save(mapeados)
  }

  findOne(id: number) {
    return `This action returns a #${id} administrativo`;
  }

  update(id: number, updateAdministrativoDto: UpdateAdministrativoDto) {
    return `This action updates a #${id} administrativo`;
  }

  remove(id: number) {
    return `This action removes a #${id} administrativo`;
  }
}
