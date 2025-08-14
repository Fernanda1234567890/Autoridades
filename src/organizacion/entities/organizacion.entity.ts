import { OrganizacionPersona } from "src/organizacion-persona/entities/organizacion-persona.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('organizaciones')
export class Organizacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', unique: true})
    tipo: string;

    @Column({ type: 'text'})
    descripcion: string; 


    @OneToMany(()=>OrganizacionPersona, organizacion_personas => organizacion_personas.organizacion)
    organizacion_personas: OrganizacionPersona[];

}
