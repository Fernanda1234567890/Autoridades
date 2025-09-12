import { Unidad } from "src/unidad/entities/unidad.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipo-unidades')
export class TipoUnidad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' }) 
    tipo: string;

    @Column({ type: 'text' })
    descripcion: string;

    @Column({ type: 'boolean', default: true})
    estado: boolean; 

    @OneToMany(()=>Unidad, unidad => unidad.tipo_unidad)
    unidades: Unidad[];
}
