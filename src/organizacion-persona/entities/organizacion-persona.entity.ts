import { Organizacion } from "src/organizacion/entities/organizacion.entity";
import { Persona } from "src/persona/entities/persona.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('organizacion-persona')
export class OrganizacionPersona {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'integer'})
    id_organizacion: number;
    
    @Column({type: 'integer'})
    id_persona: number;


    @JoinColumn({name: 'id_organizacion'})
    @ManyToOne(()=>Organizacion, organizacion => organizacion.organizacion_personas,{onDelete:'CASCADE'})
    organizacion: Organizacion;


    @JoinColumn({name: 'id_persona'})
    @ManyToOne(()=>Persona, persona => persona.organizacion_personas,{onDelete:'CASCADE'})
    persona: Persona;

    
    
}
