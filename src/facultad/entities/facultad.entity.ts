import { Carrera } from "src/carrera/entities/carrera.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('facultades')
export class Facultad {
       @PrimaryGeneratedColumn()
       id: number;
   
       @Column({ type: 'varchar', unique: true})
       nombre: string;
   
       @Column({ type: 'text'})
       sigla: string;  

       @Column({ type: 'boolean', default: true })
       estado: boolean;
   
       @OneToMany(()=>Carrera, carrera => carrera.facultad)
       carreras: Carrera[];
}
