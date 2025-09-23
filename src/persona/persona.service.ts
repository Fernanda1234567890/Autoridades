import { BadRequestException, ConflictException, Injectable, NotAcceptableException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { ILike, Repository } from 'typeorm';
import { Persona } from './entities/persona.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryPersonaDto } from './dto/query-persona.dto';


@Injectable()
export class PersonaService {
constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {} 


  async findAll(query: QueryPersonaDto) {
    const {
      page = 1,
      limit = 10,
      nombres,
      apellidos,
      ci,
      email,
      direccion,
      fecha_nac,
      estado,
      sortBy = 'id',
      sortOrder = 'ASC'
    } = query;

    const where: any = {};

    if (nombres) where.nombres = ILike(`%${nombres}%`);
    if (apellidos) where.apellidos = ILike(`%${apellidos}%`);
    if (ci) where.ci = ILike(`%${ci}%`);
    if (email) where.email = ILike(`%${email}%`);
    if (direccion) where.direccion = ILike(`%${direccion}%`);
    if (fecha_nac) where.fecha_nac = fecha_nac;

    if (estado === 'activo') where.estado = true;
    else if (estado === 'inactivo') where.estado = false;

    const [data, total] = await this.personaRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { [sortBy]: sortOrder },
      relations: ['estudiante', 'docente', 'administrativo', 'organizacion_personas'],
    });

    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    };
  }

  async seed(){

    //await this.personaRepository.query(`TRUNCATE TABLE personas CASCADE`);
    //await this.personaRepository.clear()
    //await this.personaRepository.query(`ALTER SEQUENCE personas_id_seq RESTART WITH 1`)
      const datos: CreatePersonaDto[] = [
        {  nombres: 'Ing. Pedro Guido ', apellidos: 'López Cortés ',ci: '12345008', email: 'pedro@gmail.com',  direccion: 'Av.Siempre viva 742',fecha_nac: '1955-02-20'},
        {  nombres: 'Ing. David ', apellidos: 'Soraide Lozano', ci: '8700000-a', email: 'david@gmail.com',direccion: 'Calle falsa 123', fecha_nac: '1960-08-26'},
        {  nombres: 'M. Sc. Abog. Jaqueline',apellidos: 'Filipps Díaz', ci: '12345000', email: 'jaq@gmail.com', direccion: 'Av.Siempre viva 1',fecha_nac: '1970-02-06' },
        {  nombres: 'M. Sc. Abog. Rafael', apellidos: ' Montoya Rivera', ci: '8704298', email: 'raf@gmail.com', direccion: 'Calle falsa 89',fecha_nac: '1960-05-20'},
        {  nombres: 'M. Sc. Ing. Juan Carlos', apellidos: ' Erquicia Landeau ',ci: '8750000', email: 'carlos@gmail.com',direccion: 'Calle falsa 89',fecha_nac: '1960-08-19'},
        {  nombres: 'M.B.A. Sofia Poveda Alarcón', apellidos: 'Poveda Alarcón ',ci: '7894560', email: 'sofia@gmail.com' ,direccion: 'Calle321 ',fecha_nac: '1983-08-19'},
        {  nombres: 'M. Sc. Lic. Bernardo ', apellidos: ' Choque Pareja ',ci: '1246765', email: 'bernardo@gmail.com' ,direccion: 'Calle 23143',fecha_nac: '1984-08-19'},
        {  nombres: 'M. Sc. Adm. Edwin', apellidos: 'Claure Ferreira',ci: '3246796', email: 'edwin@gmail.com',direccion: 'Calle 542',fecha_nac: '1979-08-19'},
        {  nombres: 'M. Sc. Ing. Roger ', apellidos: 'Barahona Telchi ',ci: '9752245', email: 'roger@gmail.com', direccion: 'Calle 547',fecha_nac: '1966-08-19'},
        {  nombres: 'M. Sc. Lic. Anny ', apellidos: 'Mercado Algarañaz ',ci: '2465886', email: 'anny@gmail.com', direccion: 'Calle 857',fecha_nac: '1963-08-19'},
        {  nombres: 'Ph. D. Ing. Percy Oscar', apellidos: 'Gutierrez Goméz',ci: '3334455', email: 'percy@gmail.com', direccion: 'Calle 634',fecha_nac: '1980-08-19'},
        {  nombres: 'Ing. Juan Carlos ', apellidos: 'Orellana Pereira ',ci: '2356787', email: 'juan@gmail.com',direccion: 'Calle346 ',fecha_nac: '1983-08-19'},
        {  nombres: 'Lic. Marco Antonio ', apellidos: 'Quichu Mogrovejo ',ci: '3678934', email: 'marco@gmail.com', direccion: 'Calle 6457',fecha_nac: '1987-08-19'},
        {  nombres: 'M. Sc. Ing. Daniel Reynaldo ', apellidos: 'Virgo Acuña ',ci: '2124345', email: 'daniel@gmail.com', direccion: 'Calle7658 ',fecha_nac: '1986-08-19'},
        {  nombres: 'Dr. Abog. Alberto Camilo', apellidos: 'Vera Moreira ',ci: '3113467', email: 'alberto@gmail.com', direccion: 'Calle 568',fecha_nac: '1987-08-19'},
        {  nombres: 'Tec. Sup. Jorge ', apellidos: 'Leytón ',ci: '98754554', email: 'jorge@gmail.com', direccion: 'Calle 4757',fecha_nac: '1989-08-19'},
        {  nombres: 'Univ. Cristian ', apellidos: 'Villca Choque',ci: '46879863', email: 'cristian@gmail.com', direccion: 'Calle 987',fecha_nac: '1988-08-19'},
        {  nombres: 'M. Sc. Abog. Silvestre', apellidos: ' Iñiguez Meneses',ci: '4566324', email: 'sivestre@gmail.com',direccion: 'Calle 654',fecha_nac: '1993-08-19'},
        {  nombres: 'M. Sc. Abog. Carlos Severo ', apellidos: 'Colque Iporre  ',ci: '23456787', email: 'carlossevero@gmail.com' ,direccion: 'Calle 432',fecha_nac: '1990-08-19'},
        {  nombres: 'M. Sc. Lic. Alberto ', apellidos: ' Morales Colque',ci: '4456788', email: 'albertomora@gmail.com',direccion: 'Calle 215',fecha_nac: '1976-08-19'},
        {  nombres: 'M. Sc. Lic. Carlos ', apellidos: ' Poveda Choque',ci: '2224455', email: 'carlospov@gmail.com', direccion: 'Calle 123',fecha_nac: '1973-08-19'},
        {  nombres: 'M. Sc. Lic. Teófilo', apellidos: ' Llanos Chipana',ci: '6677753', email: 'teofilo@gmail.com', direccion: 'Calle 14',fecha_nac: '1991-08-19'},
        {  nombres: 'M. Sc. Lic. Octavio ', apellidos: 'Martínez Chura ',ci: '8764566', email: 'octavio@gmail.com', direccion: 'Calle 12',fecha_nac: '1989-08-19'},
        {  nombres: 'M. Sc. Aud. Gabriel Julio ', apellidos: 'Avendaño Ondarza ',ci: '8890702', email: 'gabriel@gmail.com',direccion: 'Calle 23',fecha_nac: '1980-08-19'},
        {  nombres: 'M. Sc. Ing. Omar Freddy ', apellidos: 'Apaza Coro ',ci: '1235635', email: 'omar@gmail.com', direccion: 'Calle24r2 ',fecha_nac: '1979-08-19'},
        {  nombres: 'M. Sc. Ing. Roberto Jaime ', apellidos: ' Rodriguez Quispe',ci: '6873553', email: 'robertojaime@gmail.com', direccion: 'Calle ',fecha_nac: '1975-08-19'},
        {  nombres: 'M. Sc. Ing. Juan', apellidos: ' Correa Alejo ',ci: '3252564', email: 'juenVilla@gmail.com',direccion: 'Calle 236t',fecha_nac: '1970-08-19'},
        {  nombres: 'Ing. Eliseo ', apellidos: 'Villafuerte Mamani ',ci: '7889642', email: 'eliseo@gmail.com' ,direccion: 'Calle gy5r4',fecha_nac: '1959-08-19'},
        {  nombres: 'M. Sc. Lic. José Oscar', apellidos: '  Copa Serrudo ',ci: '5688997', email: 'joseoscar@gmail.com',direccion: 'Calle r21',fecha_nac: '1950-08-19'},
        {  nombres: 'M. Sc. Ing. Epifanio ', apellidos: ' Mamani Alizares',ci: '3367952', email: 'epifanio@gmail.com',direccion: 'Calle 124',fecha_nac: '1960-08-19'},
        {  nombres: 'Ing. Franz Freddy ', apellidos: 'Mamani Yucra ',ci: '5656567', email: 'franz@gmail.com',direccion: 'Calle 124',fecha_nac: '1963-08-19'},
        {  nombres: 'Ing. Ricardo ', apellidos: 'Vargas Caba ',ci: '7878784', email: 'ricardo@gmail.com' ,direccion: 'Calle 3453',fecha_nac: '1961-08-19'},
        {  nombres: 'M. Sc. Lic. Oscar Gunnar z', apellidos: 'Barrientos Enrique ',ci: '3433335', email: 'oscargunnar@gmail.com', telefono: 760047000,direccion: 'Calle 1324',fecha_nac: '1960-08-19'},
        {  nombres: 'M. Sc. Lic. Nelly ', apellidos: ' Camacho Ocsachoque',ci: '4356543', email: 'nelly@gmail.com', direccion: 'Calle 2142',fecha_nac: '1962-08-19'},
        {  nombres: 'M. Sc. Lic. Simon ', apellidos: 'Huaquipa Callamuyo ',ci: '5156567', email: 'simon@gmail.com',direccion: 'Calle 4124',fecha_nac: '1959-08-19'},
        {  nombres: 'M. Sc. Lic. Orlando', apellidos: 'Choque Ayma ',ci: '3235454', email: 'orlandoch@gmail.com',direccion: 'Calle 345',fecha_nac: '1958-08-19'},
        {  nombres: 'M. Sc. Lic. Gonzalo  ', apellidos: ' Pool García',ci: '6564334', email: 'gonzalo@gmail.com' ,direccion: 'Calle 5235',fecha_nac: '1957-08-19'},
        {  nombres: 'M. Sc. Lic. Elena ', apellidos: 'García Ayala ',ci: '6787650', email: 'elena@gmail.com',direccion: 'Calle 532',fecha_nac: '1956-08-19'},
        {  nombres: 'M. Sc. Lic. Teodocia', apellidos: '  Gonzáles Choque ',ci: '5467987', email: 'teodocia@gmail.com',direccion: 'Calle 523',fecha_nac: '1955-08-19'},
        {  nombres: 'M. Sc. Lic. Luis Alberto', apellidos: ' Cary Condori ',ci: '8976543', email: 'luisalberto@gmail.com' ,direccion: 'Calle 325',fecha_nac: '1996-08-19'},
        {  nombres: 'M. Sc. Lic. Nancy ', apellidos: ' Burgoa Porcel',ci: '8990453', email: 'nancy@gmail.com' ,direccion: 'Calle 536',fecha_nac: '1992-08-19'},
        {  nombres: 'M. Sc. Lic. Marcelino ', apellidos: 'Choquehuanca Ibarra ',ci: '6743804', email: 'marcelino@gmail.com' ,direccion: 'Calle45 ',fecha_nac: '1991-08-19'},
        {  nombres: 'M. Sc. Lic. Ernesto ', apellidos: ' Sanabria Villalba',ci: '6004363', email: 'ernesto@gmail.com',direccion: 'Calle 321',fecha_nac: '1990-08-19'},
        {  nombres: 'Dr. Jose Manuel ', apellidos: 'Calle Aracena',ci: '87042345', email: 'josemanuel@gmail.com', telefono:76047000 ,direccion: 'Calle 123',fecha_nac: '1978-08-19'},
        {  nombres: 'Dr. Adolfo Fernando', apellidos: ' Humerez Guzmán ',ci: '4586431', email: 'adolfofernando@gmail.com' ,direccion: 'Calle 133554',fecha_nac: '1956-08-19'},
        {  nombres: 'Juan Manuel ', apellidos: 'Lopez',ci: '87040005', email: 'juanmanuel@gmail.com' ,direccion: 'Calle 798',fecha_nac: '2000-08-19'},
        {  nombres: ' Fernando', apellidos: 'Telles Guzmán ',ci: '4580131', email: 'fernando@gmail.com' ,direccion: 'Calle 1335534',fecha_nac: '2009-08-19'},
      ]

      const mapeados = datos.map((e)=> this.personaRepository.create(e))
      return await this.personaRepository.save(mapeados)
  }

  async findOne(id: number) {
    const persona = await this.personaRepository.findOne({
      where: { id },
      relations: ['estudiante', 'docente', 'administrativo', 'organizacion_personas'],
    });
    if (!persona) {
      throw new NotAcceptableException(`Persona con id ${id} no encontrada`);
    }
    return persona;
  }

  async findByCI(ci: string): Promise<Persona | null> {
    return await this.personaRepository.findOne({ where: { ci } });
  }


  async create(createPersonaDto: CreatePersonaDto) {
    const existing = await this.personaRepository.findOne({
      where: [
        { ci: createPersonaDto.ci },
        { email: createPersonaDto.email }
      ],
    });

    if (existing) {
      if (existing.ci === createPersonaDto.ci) {
        throw new ConflictException(`La CI ${createPersonaDto.ci} ya está registrada`);
      }
      if (existing.email === createPersonaDto.email) {
        throw new ConflictException(`El email ${createPersonaDto.email} ya está registrado`);
      }
    }

    let fechaNacDate: Date;
    try {
      fechaNacDate = new Date(createPersonaDto.fecha_nac);
      
      if (isNaN(fechaNacDate.getTime())) {
        throw new BadRequestException('Formato de fecha inválido');
      }

      if (fechaNacDate > new Date()) {
        throw new BadRequestException('La fecha de nacimiento no puede ser futura');
      }

    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error al procesar la fecha de nacimiento');
    }

    const persona = this.personaRepository.create({
      ...createPersonaDto,
      fecha_nac: fechaNacDate,
    });

    return await this.personaRepository.save(persona);
  }

  async update(id: number, updatePersonaDto: UpdatePersonaDto) {
    const persona = await this.findOne(id);
    Object.assign(persona, updatePersonaDto);
    return await this.personaRepository.save(persona);
  }

  async remove(id: number) {
    const persona = await this.findOne(id);
    if (!persona.estado) {
      throw new BadRequestException('La persona ya está inactiva');
    }
    persona.estado = false;
    await this.personaRepository.save(persona);
    return { success: true, message: `Persona con id ${id} dada de baja` };
  }
}