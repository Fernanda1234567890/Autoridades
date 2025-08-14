import { Unidad } from "src/unidad/entities/unidad.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipo-unidades')
export class TipoUnidad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', unique: true })
    tipo: string;

    @Column({ type: 'text' })
    descripcion: string;

    @OneToMany(()=>Unidad, unidad => unidad.tipo_unidad)
    unidades: Unidad[];
}
