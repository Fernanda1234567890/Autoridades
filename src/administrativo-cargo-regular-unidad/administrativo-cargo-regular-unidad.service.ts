import { Inject, Injectable } from '@nestjs/common';
import { CreateAdministrativoCargoRegularUnidadDto } from './dto/create-administrativo-cargo-regular-unidad.dto';
import { UpdateAdministrativoCargoRegularUnidadDto } from './dto/update-administrativo-cargo-regular-unidad.dto';
import { Repository } from 'typeorm';
import { AdministrativoCargoRegularUnidad } from './entities/administrativo-cargo-regular-unidad.entity';

@Injectable()
export class AdministrativoCargoRegularUnidadService {

  @Inject('AdministrativoCargoRegularUnidadRepository')
  private readonly adimnistrativoCargoRegularUnidadRepository: Repository<AdministrativoCargoRegularUnidad>
  create(createAdministrativoCargoRegularUnidadDto: CreateAdministrativoCargoRegularUnidadDto) {
    return 'This action adds a new administrativoCargoRegularUnidad';
  }

  findAll() {
    return `This action returns all administrativoCargoRegularUnidad`;
  }
  async seed(){

    //await this.adimnistrativoCargoRegularUnidadRepository.query(`TRUNCATE TABLE administrativo-cargo-regular-unidad CASCADE`);
    //await this.adimnistrativoCargoRegularUnidadRepository.clear()
    //await this.adimnistrativoCargoRegularUnidadRepository.query(`ALTER SEQUENCE "administrativo-cargo-regular-unidad_id_seq" RESTART WITH 1`)
    
    const datos: CreateAdministrativoCargoRegularUnidadDto[] = [
      {
        id: 1,
        id_cargo: 1,
        id_unidad: 1,
        id_administrativo: 1,
        fecha_ingreso: new Date('2023-01-01'),
      },
      {
        id: 2,
        id_cargo: 2,
        id_unidad: 2,
        id_administrativo: 2,
        fecha_ingreso: new Date('2023-02-01'),
      }
    ];
     const mapeados = datos.map((e) => this.adimnistrativoCargoRegularUnidadRepository.create(e));
    return await this.adimnistrativoCargoRegularUnidadRepository.save(mapeados);
 
  }

  findOne(id: number) {
    return `This action returns a #${id} administrativoCargoRegularUnidad`;
  }

  update(id: number, updateAdministrativoCargoRegularUnidadDto: UpdateAdministrativoCargoRegularUnidadDto) {
    return `This action updates a #${id} administrativoCargoRegularUnidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} administrativoCargoRegularUnidad`;
  }
}
