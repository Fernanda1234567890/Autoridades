import { Persona } from "src/persona/entities/persona.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('estudiantes')
export class Estudiante {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255})
    carrera: string;

    @Column({type: 'integer'})
    ru: number;
    
    @Column({type: 'integer', unique: true})
    id_persona: number;

    @JoinColumn({name: 'id_persona'})
    @OneToOne(()=> Persona, persona=> persona.estudiante)
    persona: Persona;
}
