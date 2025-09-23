import { Administrativo } from "src/administrativo/entities/administrativo.entity";
import { Docente } from "src/docente/entities/docente.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { OrganizacionPersona } from "src/organizacion-persona/entities/organizacion-persona.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('personas')
export class Persona {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    nombres: string;

    @Column({ type: 'varchar', length: 150 })
    apellidos: string;

    @Column({ type: 'varchar', length: 12, unique: true })
    ci: string;

    @Column({ type: 'varchar', length: 255, nullable: true}) //unique: true 
    email: string;

    @Column({ type: 'integer', nullable: true })
    telefono: number;

    @Column({ type: 'varchar', length: 255,nullable: true })
    direccion: string;

    @Column({ type: 'date' })
    fecha_nac: Date;

    @Column({ type: 'varchar', length:255 ,  nullable: true })
    img: string;

    @Column({ type: 'boolean', default: true })
    estado: boolean;

    @OneToOne(() => Estudiante, estudiante => estudiante.persona)
    estudiante: Estudiante

    @OneToOne(() => Docente, docente => docente.persona)
    docente: Docente;

    @OneToOne(() => Administrativo, administrativo => administrativo.persona)
    administrativo: Administrativo;

    @OneToMany(() => OrganizacionPersona, organizacion_personas => organizacion_personas.persona)
    organizacion_personas: OrganizacionPersona[];

    @OneToOne(() => Usuario ,usuario => usuario.persona)
    usuario: Usuario;
}
