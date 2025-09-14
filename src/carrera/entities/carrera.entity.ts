import { Docente } from "src/docente/entities/docente.entity";
import { Facultad } from "src/facultad/entities/facultad.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('carreras')
export class Carrera {
       @PrimaryGeneratedColumn()
       id: number;
   
       @Column({ type: 'varchar', unique: true})
       nombre: string;
   
       @Column({ type: 'text'})
       sigla: string; 
   
       @OneToMany(()=>Docente, docente => docente.carrera)
       docentes: Docente[];

        @ManyToOne(() => Facultad, facultad => facultad.carreras, { onDelete: 'CASCADE' })
        @JoinColumn({ name: 'id_facultad' })
        facultad: Facultad;
    }
