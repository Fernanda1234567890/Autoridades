import { AdministrativoCargoRegularUnidad } from "src/administrativo-cargo-regular-unidad/entities/administrativo-cargo-regular-unidad.entity";
import { CargoIntermedioDocente } from "src/cargo-intermedio-docente/entities/cargo-intermedio-docente.entity";
import { Unidad } from "src/unidad/entities/unidad.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('cargos-intermedios')
export class CargoIntermedio {
        @PrimaryGeneratedColumn()
        id: number;

        @Column({ type: 'varchar', unique: true })
        nombre: string;

        @Column({ type: 'text' })
        descripcion: string;

        @Column({ type: 'integer', nullable: true })
        nivel_jerarquico: number;

        @Column({ type: 'integer' })
        id_unidad: number;

        @JoinColumn({ name: 'id_unidad' })
        @ManyToOne(() => Unidad, unidad => unidad.cargos_intermedios,{onDelete:'CASCADE'})
        unidad: Unidad;

        @OneToMany(() => CargoIntermedioDocente, cargo_intermedio_docente => cargo_intermedio_docente.cargo_intermedio)
        cargo_intermedio_docente: CargoIntermedioDocente[];
}