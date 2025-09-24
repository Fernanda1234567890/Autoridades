import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnidadDto } from './dto/create-unidad.dto';
import { UpdateUnidadDto } from './dto/update-unidad.dto';
import { Repository } from 'typeorm';
import { Unidad } from './entities/unidad.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UnidadService {
  constructor(
    @InjectRepository(Unidad)
    private readonly unidadRepository: Repository<Unidad>,
  ) {}

  async create(createUnidadDto: CreateUnidadDto) {
    const nombre = createUnidadDto.nombre?.trim();
    if (!nombre) throw new BadRequestException('El nombre de la unidad es requerido');

    const existe = await this.unidadRepository.findOne({ where: { nombre } });
    if (existe) throw new BadRequestException(`Ya existe una unidad con el nombre "${nombre}"`);

    const nuevaUnidad = this.unidadRepository.create({
      ...createUnidadDto,
      nombre,
      estado: true,
    });

    const saved = await this.unidadRepository.save(nuevaUnidad);
    return { success: true, message: 'Unidad creada correctamente', data: saved };
  }

  async findAll(
    page = 1,
    limit = 10,
    filters?: { nombre?: string; responsable?: string; id_tipo_unidad?: number | string; estado?: 'activo' | 'inactivo' | 'todos' },
  ) {
    const query = this.unidadRepository.createQueryBuilder('unidad')
      .leftJoinAndSelect('unidad.tipo_unidad', 'tipo_unidad')       // relación ManyToOne -> TipoUnidad
      .leftJoinAndSelect('unidad.depende_de', 'depende_de');        // relación ManyToOne -> Unidad (auto-relación)

    if (filters?.nombre && filters.nombre.trim() !== '') {
      query.andWhere('unidad.nombre ILIKE :nombre', { nombre: `%${filters.nombre.trim()}%` });
    }

    if (filters?.responsable && filters.responsable.trim() !== '') {
      query.andWhere('unidad.responsable ILIKE :responsable', { responsable: `%${filters.responsable.trim()}%` });
    }

    if (filters?.id_tipo_unidad !== undefined && filters.id_tipo_unidad !== null && String(filters.id_tipo_unidad).trim() !== '') {
      const tipoId = Number(filters.id_tipo_unidad);
      if (!isNaN(tipoId)) {
        query.andWhere('tipo_unidad.id = :id_tipo_unidad', { id_tipo_unidad: tipoId });
      }
    }

    if (filters?.estado && filters.estado !== 'todos') {
      if (filters.estado === 'activo') {
        query.andWhere('unidad.estado = :estado', { estado: true });
      } else if (filters.estado === 'inactivo') {
        query.andWhere('unidad.estado = :estado', { estado: false });
      }
    }

    query.orderBy('unidad.id', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    try {
      const [data, total] = await query.getManyAndCount();
      return { success: true, data, meta: { total, page, limit } };
    } catch (error) {
      console.error('Error en findAll Unidad:', error?.message ?? error, error?.stack ?? '');
      throw new Error('No se pudo obtener la lista de unidades. Revisa los logs del servidor.');
    }
  }

    async seed() {
    const datos: CreateUnidadDto[] = [
      {  nombre: 'Rectorado', descripcion: 'Unidad del Rector', responsable: 'Rector', id_tipo_unidad: 1, estado: true },
      {  nombre: 'Secretaria General', descripcion: 'Secretaria General', responsable: 'Secretaria', id_tipo_unidad: 2, id_unidad: 1, estado: true },
      {  nombre: 'Titulos', descripcion: 'Titulos', responsable: '', id_tipo_unidad: 3 ,  id_unidad: 2, estado: true },
      {  nombre: 'Asesoria Juridica', descripcion: 'Asesoria Juridica', responsable: '', id_tipo_unidad:2 , id_unidad: 1, estado: true },
      {  nombre: 'Auditoria Interna', descripcion: 'Auditoria Interna', responsable: '', id_tipo_unidad: 2, id_unidad: 1, estado: true },
      {  nombre: 'Dirección de Evaluación y Acreditación', descripcion: 'Dirección de Evaluación y Acreditación', responsable: '', id_tipo_unidad: 2, id_unidad: 1, estado: true },
      {  nombre: 'Dirección de Planificación Universitaria', descripcion: 'Dirección de Planificación Universitaria', responsable: '', id_tipo_unidad:2, id_unidad: 1, estado: true },
      { nombre: 'Depto. Planeamiento Org y Métodos', descripcion: 'Departamento Planeamiento Org y Métodos', responsable: '', id_tipo_unidad:3 , id_unidad: 7, estado: true },
      {  nombre: 'Depto. de Proyectos', descripcion: 'Departamento de Proyectos', responsable: '', id_tipo_unidad:3 , id_unidad: 7, estado: true },
      {  nombre: 'Dirección Administrativa y Financiera', descripcion: 'Dirección Administrativa y Financiera', responsable: '', id_tipo_unidad:2 , id_unidad: 1, estado: true },
      {  nombre: 'Depto. de Personal', descripcion: 'Departamento de Personal', responsable: '', id_tipo_unidad:3 , id_unidad: 10, estado: true },
      {  nombre: 'Depto. de Finanzas', descripcion: 'Departamento de Finanzas', responsable: '', id_tipo_unidad: 3, id_unidad: 10, estado: true },
      { nombre: 'Division de Presupuestos', descripcion: 'Division de Presupuestos', responsable: '', id_tipo_unidad: 3, id_unidad: 12, estado: true },
      {  nombre: 'Division de Contabilidad', descripcion: 'Division de Contabilidad', responsable: '', id_tipo_unidad:3 , id_unidad: 12, estado: true },
      {  nombre: 'Division de Tesoreria', descripcion: 'Division de Tesoreria', responsable: '', id_tipo_unidad: 3, id_unidad: 12, estado: true },
      { nombre: 'División de Bienes e Inventarios', descripcion: 'División de Bienes e Inventarios', responsable: '', id_tipo_unidad: 3, id_unidad: 12, estado: true },
      { nombre: 'Depto. de Infraestructura', descripcion: 'Depto. de Infraestructura', responsable: '', id_tipo_unidad: 3, id_unidad: 10, estado: true },
      {  nombre: 'Direción de Relaciones Nacionales e Internacionales', descripcion: 'Direción de Relaciones Nacionales e Internacionales', responsable: '', id_tipo_unidad: 3, id_unidad: 1, estado: true },
      {  nombre: 'Data Center', descripcion: 'Data Center', responsable: '', id_tipo_unidad: 2, id_unidad: 1, estado: true },
      { nombre: 'Vicerrectorado', descripcion: 'Vicerrectorado', responsable: '', id_tipo_unidad: 1 , estado: true },
      {  nombre: 'Dirección de Investigación Ciencia y Tecnología', descripcion: 'Dirección de _Investigación Ciencia y Tecnología', responsable: '', id_tipo_unidad: 2, id_unidad: 20, estado: true },
      {  nombre: 'Dirección de Servicios Academicos', descripcion: 'Dirección de Servicios Academicos', responsable: '', id_tipo_unidad: 2,id_unidad: 20, estado: true },
      { nombre: 'Direccion de Postgrado', descripcion: 'Direccion de Postgrado', responsable: '', id_tipo_unidad: 2, id_unidad: 20, estado: true },
      {  nombre: 'Dirección de Interacción Social', descripcion: 'Dirección de Intecación Social', responsable: '', id_tipo_unidad: 2, id_unidad: 20, estado: true },
      {  nombre: 'Depto. de Gestión Curricular', descripcion: 'Depto. de Gestión Curricular', responsable: '', id_tipo_unidad: 3,id_unidad: 22, estado: true },
      {  nombre: 'Registros y Admiciones', descripcion: 'Registros y Admiciones', responsable: '', id_tipo_unidad: 3, id_unidad: 22, estado: true },
      {  nombre: 'Bienestar Universitario', descripcion: 'Bienestar Universitario', responsable: '', id_tipo_unidad: 3, id_unidad: 22, estado: true },
      { nombre: 'Biblioteca', descripcion: 'Biblioteca', responsable: '', id_tipo_unidad: 3, id_unidad: 22, estado: true },
      {  nombre: 'Carrera Ingenieria de Sistemas', descripcion: 'Carrera Ingenieria de Sistemas', responsable: '', id_tipo_unidad:2 , id_unidad: 20,estado: true },
      {  nombre: 'Carrera Odontología', descripcion: 'Carrera Odontología', responsable: '', id_tipo_unidad: 2, id_unidad: 20, estado: true },
      { nombre: 'Facultad de Derecho', descripcion: 'Facultad de Derecho', responsable: '', id_tipo_unidad:2 , id_unidad: 20, estado: true },
      {  nombre: 'Carrera de Derecho', descripcion: 'Carrera de Derecho', responsable: '', id_tipo_unidad:3 , id_unidad: 31, estado: true },
      {  nombre: 'Facultad de CC EE. FF. y AA.', descripcion: 'Facultad de CC EE. FF. y AA.', responsable: '', id_tipo_unidad: 3, id_unidad: 20, estado: true },
      {  nombre: 'Carrera de Administración de Empresas', descripcion: 'Carrera de Administración de Empresas', responsable: '', id_tipo_unidad:3 , id_unidad: 33, estado: true },
      {  nombre: 'Carrera de Contabilidad y Finanzas ', descripcion: 'Carrera de Contabilidad y Finanzas', responsable: '', id_tipo_unidad: 3, id_unidad: 33, estado: true },
      { nombre: 'Carrera de Economía', descripcion: 'Carrera de Economía', responsable: '', id_tipo_unidad:3 , id_unidad: 33, estado: true },
      {  nombre: 'Carrera de Auditoria - Contaduría Pública ', descripcion: 'Carrera de Auditoria - Contaduría Pública', responsable: '', id_tipo_unidad:3 , id_unidad: 33, estado: true },
      {  nombre: 'Carrera de Ingeniería Comercial ', descripcion: 'Carrera de Ingeniería Comercial', responsable: '', id_tipo_unidad:3 , id_unidad: 33, estado: true },
      { nombre: 'Facultad de Ingeniería', descripcion: 'Facultad de Ingeniería', responsable: '', id_tipo_unidad:2 , id_unidad: 20, estado: true },
      {  nombre: 'Carrera de Ingeniería Civil', descripcion: 'Carrera de Ingeniería Civil', responsable: '', id_tipo_unidad: 3,  id_unidad: 38, estado: true },
      {  nombre: 'Carrera de Construcciones Civiles', descripcion: 'Carrera de Construcciones Civiles', responsable: '', id_tipo_unidad: 3, id_unidad: 38, estado: true },
      {  nombre: 'Carrera de Ingeniería en Geodesia y Topografía', descripcion: 'Carrera de Ingeniería en Geodesia y Topografía', responsable: '', id_tipo_unidad: 3, id_unidad: 38, estado: true },
      {  nombre: 'Facultad de Ingeniería Minera', descripcion: 'Facultad de Ingeniería Minera', responsable: '', id_tipo_unidad: 2, id_unidad: 20, estado: true },
      { nombre: 'Carrera de Ingeniería de Minas', descripcion: 'Carrera de Ingeniería de Minas', responsable: '', id_tipo_unidad:3 ,  id_unidad: 43, estado: true },
      {  nombre: 'Carrera de Ingenieria de Procesos de materias primas minerales', descripcion: 'Carrera de Ingenieria de Procesos de materias primas minerales', responsable: '', id_tipo_unidad:3 , id_unidad: 43, estado: true },
      {  nombre: 'Facultad de Ciencias Puras', descripcion: 'Facultad de Ciencias Puras', responsable: '', id_tipo_unidad:2 , id_unidad: 20, estado: true },
      { nombre: 'Carrera de Estadística', descripcion: 'Carrera de Estadística', responsable: '', id_tipo_unidad: 3, id_unidad: 46, estado: true },
      {  nombre: 'Carrera de Física', descripcion: 'Carrera de Física', responsable: '', id_tipo_unidad:3 , id_unidad: 46, estado: true },
      {  nombre: 'Carrera de Ingeniería Informática', descripcion: 'Carrera de Ingeniería Informática', responsable: '', id_tipo_unidad:3 , id_unidad: 46, estado: true },
      {  nombre: 'Carrera de Matemática', descripcion: 'Carrera de Matemática', responsable: '', id_tipo_unidad:3 , id_unidad: 46, estado: true },
      {  nombre: 'Carrera de Química', descripcion: 'Carrera de Química', responsable: '', id_tipo_unidad:3 , id_unidad: 46, estado: true },
      { nombre: 'Facultad de Ciencias Sociales y Humanísticas', descripcion: 'Facultad de Ciencias Sociales y Humanísticas', responsable: '', id_tipo_unidad: 2, id_unidad: 20, estado: true },
      {  nombre: 'Carrera de Turismo', descripcion: 'Carrera de Turismo', responsable: '', id_tipo_unidad: 3,  id_unidad: 52, estado: true },
      {  nombre: 'Carrera de Trabajo Social', descripcion: 'Carrera de Trabajo Social', responsable: '', id_tipo_unidad: 3, id_unidad: 52, estado: true },
      { nombre: 'Carrera de Lingüística e Idiomas', descripcion: 'Carrera de Lingüística e Idiomas', responsable: '', id_tipo_unidad: 3,  id_unidad: 52, estado: true },
      {  nombre: 'Programa de Ciencias de la Comunicación ', descripcion: 'Programa de Ciencias de la Comunicación', responsable: '', id_tipo_unidad:3 ,  id_unidad: 52, estado: true },
      {  nombre: 'Facultad de Medicina', descripcion: 'Facultad de Medicina', responsable: '', id_tipo_unidad: 2, id_unidad: 20, estado: true },
      { nombre: 'Carrera de Medicina ', descripcion: 'Carrera de Medicina ', responsable: '', id_tipo_unidad: 3,  id_unidad: 57, estado: true },
      // {  nombre: '', descripcion: '', responsable: '', id_tipo_unidad: , estado: true },
      // {  nombre: '', descripcion: '', responsable: '', id_tipo_unidad: , estado: true },
      // { nombre: '', descripcion: '', responsable: '', id_tipo_unidad: , estado: true },
      // {  nombre: '', descripcion: '', responsable: '', id_tipo_unidad: , estado: true },
      // {  nombre: '', descripcion: '', responsable: '', id_tipo_unidad: , estado: true },
      // { nombre: '', descripcion: '', responsable: '', id_tipo_unidad: , estado: true },
      // {  nombre: '', descripcion: '', responsable: '', id_tipo_unidad: , estado: true },
      // {  nombre: '', descripcion: '', responsable: '', id_tipo_unidad: , estado: true },
      // { nombre: '', descripcion: '', responsable: '', id_tipo_unidad: , estado: true },
      // {  nombre: '', descripcion: '', responsable: '', id_tipo_unidad: , estado: true },
      // {  nombre: '', descripcion: '', responsable: '', id_tipo_unidad: , estado: true },
    ];
 
    const mapeados = datos.map((e) => this.unidadRepository.create(e));
    return await this.unidadRepository.save(mapeados);
  }

  async findOne(id: number) {
    const unidad = await this.unidadRepository.findOne({
      where: { id },
      relations: ['depende_de', 'tipo_unidad'], 
    });
    if (!unidad) throw new NotFoundException(`Unidad con id ${id} no encontrada`);
    return { success: true, data: unidad };
  }

  async search(params: { nombre?: string; responsable?: string; id_tipo_unidad?: number }) {
    const query = this.unidadRepository.createQueryBuilder('unidad')
      .leftJoinAndSelect('unidad.tipo_unidad', 'tipo_unidad');

    if (params.nombre && params.nombre.trim() !== '') {
      query.andWhere('unidad.nombre ILIKE :nombre', { nombre: `%${params.nombre.trim()}%` });
    }
    if (params.responsable && params.responsable.trim() !== '') {
      query.andWhere('unidad.responsable ILIKE :responsable', { responsable: `%${params.responsable.trim()}%` });
    }
    if (params.id_tipo_unidad !== undefined && params.id_tipo_unidad !== null && String(params.id_tipo_unidad).trim() !== '') {
      const tipoId = Number(params.id_tipo_unidad);
      if (!isNaN(tipoId)) {
        query.andWhere('tipo_unidad.id = :id_tipo_unidad', { id_tipo_unidad: tipoId });
      }
    }

    try {
      const results = await query.getMany();
      return { success: true, message: results.length ? 'Resultados encontrados' : 'No se encontraron coincidencias', data: results };
    } catch (error) {
      console.error('Error en search Unidad:', error?.message ?? error, error?.stack ?? '');
      throw new Error('Error al buscar unidades.');
    }
  }

  async update(id: number, dto: UpdateUnidadDto) {
    const { data: unidad } = await this.findOne(id);
    Object.assign(unidad, dto);
    const updated = await this.unidadRepository.save(unidad);
    return { success: true, message: 'Unidad actualizada correctamente', data: updated };
  }

  async remove(id: number) {
    const { data: unidad } = await this.findOne(id);
    if (!unidad.estado) throw new BadRequestException('La unidad ya está desactivada');
    unidad.estado = false;
    const updated = await this.unidadRepository.save(unidad);
    return { success: true, message: 'Unidad desactivada correctamente', data: updated };
  }

  async restore(id: number) {
    const { data: unidad } = await this.findOne(id);
    if (unidad.estado) throw new BadRequestException('La unidad ya está activa');
    unidad.estado = true;
    const updated = await this.unidadRepository.save(unidad);
    return { success: true, message: 'Unidad reactivada correctamente', data: updated };
  }
}
