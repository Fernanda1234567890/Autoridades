import { Administrativo } from "src/administrativo/entities/administrativo.entity";
import { CargoRegular } from "src/cargo-regular/entities/cargo-regular.entity";
import { Unidad } from "src/unidad/entities/unidad.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('administrativo-cargo-regular-unidad')
export class AdministrativoCargoRegularUnidad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer' })
    id_cargo: number;

    @Column({ type: 'integer' })
    id_unidad: number;

    @Column({ type: 'integer' })
    id_administrativo: number;

    @Column({ type: 'date' })
    fecha_ingreso: Date;

    @Column({ type: 'date', nullable: true })
    fecha_fin: Date;

    @JoinColumn({ name: 'id_cargo' })
    @ManyToOne(() => CargoRegular, cargoRegular => cargoRegular.administrativo_cargo_regular_unidades, { onDelete: 'CASCADE' })
    cargo_regular: CargoRegular;

    @JoinColumn({ name: 'id_unidad' })
    @ManyToOne(() => Unidad, unidad => unidad.administrativo_cargo_regular_unidades, { onDelete: 'CASCADE' })
    unidad: Unidad;

    @JoinColumn({ name: 'id_administrativo' })
    @ManyToOne(() => Administrativo, administrativo => administrativo.administrativo_cargo_regular_unidades, { onDelete: 'CASCADE' })
    administrativo: Administrativo;
}
