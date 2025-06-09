import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UnitTypeService } from './unit-type.service';
import { randomUUID } from 'crypto';


async function seedUnitTypes() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(UnitTypeService);


const data = [
  { uuid: randomUUID(), name: 'Unidad Mayor', description: 'Unidad de mayor jerarquía', type: 'unidad_mayor' },
  { uuid: randomUUID(), name: 'Unidad Intermedia', description: 'Unidad de nivel intermedio', type: 'unidad_intermedia' },
  { uuid: randomUUID(), name: 'Unidad Subdependiente', description: 'Unidad subordinada a otra', type: 'unidad_subdependiente' },

  { uuid: randomUUID(), name: 'Dirección General de Planeación', description: 'Encargada de la planificación estratégica institucional', type: 'unidad_mayor' },
  { uuid: randomUUID(), name: 'Dirección de Recursos Humanos', description: 'Gestiona el personal y procesos de talento humano', type: 'unidad_intermedia' },
  { uuid: randomUUID(), name: 'Departamento de Nómina', description: 'Encargado de pagos y administración salarial', type: 'unidad_subdependiente' },
  { uuid: randomUUID(), name: 'Coordinación de Capacitación', description: 'Organiza actividades de formación', type: 'unidad_subdependiente' },

  { uuid: randomUUID(), name: 'Dirección de Finanzas', description: 'Administra recursos financieros y presupuestos', type: 'unidad_mayor' },
  { uuid: randomUUID(), name: 'Departamento de Contabilidad', description: 'Responsable del registro contable institucional', type: 'unidad_intermedia' },
  { uuid: randomUUID(), name: 'Sección de Auditoría Interna', description: 'Verifica y audita procesos internos', type: 'unidad_subdependiente' },

  { uuid: randomUUID(), name: 'Dirección de Tecnologías', description: 'Encargada de infraestructura tecnológica', type: 'unidad_mayor' },
  { uuid: randomUUID(), name: 'Departamento de Soporte Técnico', description: 'Brinda apoyo técnico a usuarios', type: 'unidad_intermedia' },
  { uuid: randomUUID(), name: 'Coordinación de Redes', description: 'Gestiona conectividad y redes', type: 'unidad_subdependiente' },
  { uuid: randomUUID(), name: 'Coordinación de Sistemas', description: 'Desarrolla y mantiene sistemas informáticos', type: 'unidad_subdependiente' },

  { uuid: randomUUID(), name: 'Dirección Jurídica', description: 'Asesora legalmente a la institución', type: 'unidad_mayor' },
  { uuid: randomUUID(), name: 'Departamento de Contratos', description: 'Elabora y revisa contratos', type: 'unidad_intermedia' },
  { uuid: randomUUID(), name: 'Coordinación Legal de Proyectos', description: 'Apoya jurídicamente a proyectos específicos', type: 'unidad_subdependiente' },

  { uuid: randomUUID(), name: 'Unidad de Transparencia', description: 'Promueve la transparencia institucional', type: 'unidad_mayor' },
  { uuid: randomUUID(), name: 'Departamento de Acceso a la Información', description: 'Gestiona solicitudes de información pública', type: 'unidad_intermedia' },

  { uuid: randomUUID(), name: 'Unidad de Evaluación', description: 'Evalúa el desempeño institucional', type: 'unidad_mayor' },
  { uuid: randomUUID(), name: 'Departamento de Indicadores', description: 'Monitorea indicadores de gestión', type: 'unidad_intermedia' },

  { uuid: randomUUID(), name: 'Unidad de Proyectos Especiales', description: 'Desarrolla iniciativas estratégicas', type: 'unidad_mayor' },
  { uuid: randomUUID(), name: 'Oficina de Cooperación Internacional', description: 'Gestiona relaciones internacionales', type: 'unidad_intermedia' },

  { uuid: randomUUID(), name: 'Dirección de Comunicación Institucional', description: 'Gestiona la imagen institucional', type: 'unidad_mayor' },
  { uuid: randomUUID(), name: 'Departamento de Prensa', description: 'Maneja relaciones con medios', type: 'unidad_intermedia' },
  { uuid: randomUUID(), name: 'Sección de Diseño Gráfico', description: 'Produce material visual', type: 'unidad_subdependiente' },

  { uuid: randomUUID(), name: 'Dirección Académica', description: 'Coordina las actividades académicas', type: 'unidad_mayor' },
  { uuid: randomUUID(), name: 'Departamento de Currículo', description: 'Desarrolla planes de estudio', type: 'unidad_intermedia' },
  { uuid: randomUUID(), name: 'Coordinación de Evaluación Docente', description: 'Evalúa desempeño de profesores', type: 'unidad_subdependiente' },

  { uuid: randomUUID(), name: 'Vicerrectoría Administrativa', description: 'Supervisa la administración general', type: 'unidad_mayor' },
  { uuid: randomUUID(), name: 'Departamento de Servicios Generales', description: 'Administra servicios y logística', type: 'unidad_intermedia' },
  { uuid: randomUUID(), name: 'Sección de Mantenimiento', description: 'Realiza mantenimiento a instalaciones', type: 'unidad_subdependiente' },

  { uuid: randomUUID(), name: 'Vicerrectoría Académica', description: 'Coordina todas las actividades académicas', type: 'unidad_mayor' },
  { uuid: randomUUID(), name: 'Departamento de Investigación', description: 'Fomenta la investigación institucional', type: 'unidad_intermedia' },
  { uuid: randomUUID(), name: 'Unidad de Ética en Investigación', description: 'Revisa protocolos éticos de investigación', type: 'unidad_subdependiente' },

  { uuid: randomUUID(), name: 'Secretaría General', description: 'Coordina documentación y archivos oficiales', type: 'unidad_mayor' },
  { uuid: randomUUID(), name: 'Departamento de Archivo', description: 'Gestiona los archivos institucionales', type: 'unidad_intermedia' },
  { uuid: randomUUID(), name: 'Sección de Digitalización', description: 'Digitaliza y conserva documentos', type: 'unidad_subdependiente' },

  { uuid: randomUUID(), name: 'Unidad de Género', description: 'Promueve la equidad de género', type: 'unidad_mayor' },
  { uuid: randomUUID(), name: 'Oficina de Atención a Víctimas', description: 'Brinda atención y acompañamiento', type: 'unidad_intermedia' },

  { uuid: randomUUID(), name: 'Unidad de Seguridad Institucional', description: 'Vela por la seguridad física', type: 'unidad_mayor' },
  { uuid: randomUUID(), name: 'Departamento de Vigilancia', description: 'Coordina personal de seguridad', type: 'unidad_intermedia' },
  { uuid: randomUUID(), name: 'Sección de Control de Accesos', description: 'Supervisa entradas y salidas', type: 'unidad_subdependiente' },

  { uuid: randomUUID(), name: 'Dirección de Bienestar', description: 'Atiende necesidades del personal', type: 'unidad_mayor' },
  { uuid: randomUUID(), name: 'Departamento de Salud Ocupacional', description: 'Promueve el bienestar físico y mental', type: 'unidad_intermedia' },
  { uuid: randomUUID(), name: 'Unidad de Recreación y Cultura', description: 'Organiza actividades recreativas', type: 'unidad_subdependiente' },
];


  for (const item of data) {
    try {
      await service.create(item);
      console.log(`Insertado: ${item.name}`);
    } catch (e) {
      console.error(`Error insertando ${item.name}:`, e.message);
    }
  }
  await app.close();
}

seedUnitTypes();
