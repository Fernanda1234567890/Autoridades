import { CargoIntermedioDocente } from "src/cargo-intermedio-docente/entities/cargo-intermedio-docente.entity";
import { Carrera } from "src/carrera/entities/carrera.entity";
import { Persona } from "src/persona/entities/persona.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('docentes')
export class Docente {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer', unique: true })
    id_persona: number;
           
    @Column({ type: 'boolean', default: true})
    estado: boolean; 

    @JoinColumn({name: 'id_persona'})
    @OneToOne(() => Persona, persona => persona.docente)
    persona: Persona;

    @OneToMany(()=>CargoIntermedioDocente, cargo_intermedio_docente => cargo_intermedio_docente.docente)
    cargo_intermedio_docente: CargoIntermedioDocente[];

    @ManyToOne(() => Carrera, carrera => carrera.docentes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_carrera' })
    carrera: Carrera;
}
