import { CargoIntermedioDocente } from "src/cargo-intermedio-docente/entities/cargo-intermedio-docente.entity";
import { Persona } from "src/persona/entities/persona.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('docentes')
export class Docente {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    carrera: string;

    @Column({ type: 'integer', unique: true })
    id_persona: number;
           
    @Column({ type: 'boolean', default: true})
    estado: boolean; 

    @JoinColumn({name: 'id_persona'})
    @OneToOne(() => Persona, persona => persona.docente)
    persona: Persona;

    @OneToMany(()=>CargoIntermedioDocente, cargo_intermedio_docente => cargo_intermedio_docente.docente)
    cargo_intermedio_docente: CargoIntermedioDocente[];

}
