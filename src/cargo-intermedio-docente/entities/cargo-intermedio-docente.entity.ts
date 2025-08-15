import { CargoIntermedio } from "src/cargo-intermedio/entities/cargo-intermedio.entity";
import { Docente } from "src/docente/entities/docente.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('cargo-intermedio-docentes')
export class CargoIntermedioDocente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer' })
    id_docente: number;

    @Column({ type: 'integer' })
    id_cargo_intermedio: number;

    @Column({ type: 'date' })
    fecha_inicio: Date;

    @Column({ type: 'date' })
    fecha_fin: Date;



    @ManyToOne(() => Docente, docente => docente.cargo_intermedio_docente,{onDelete:'CASCADE'})
    docente: Docente;

    
    @ManyToOne(() => CargoIntermedio, cargo_intermedio => cargo_intermedio.cargo_intermedio_docente,{onDelete:'CASCADE'})
    cargo_intermedio: CargoIntermedio;


}
