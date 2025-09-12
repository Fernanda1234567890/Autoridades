import { AdministrativoCargoRegularUnidad } from "src/administrativo-cargo-regular-unidad/entities/administrativo-cargo-regular-unidad.entity";
import { CargoIntermedio } from "src/cargo-intermedio/entities/cargo-intermedio.entity";
import { TipoUnidad } from "src/tipo-unidad/entities/tipo-unidad.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('unidades')
export class Unidad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    nombre: string;

    @Column({ type: 'text' })
    descripcion: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    logo: string;

    @Column({ type: 'varchar', length: 150 })
    responsable: string;

    @Column({ type: 'integer', nullable: true })
    id_unidad: number;

    @Column({ type: 'integer' })
    id_tipo_unidad: number;

    @Column({ type: 'boolean', default: true})
    estado: boolean; 

    @JoinColumn({ name: 'id_unidad' })
    @ManyToOne(() => Unidad, unidad => unidad.dependencias, { onDelete: 'CASCADE'})
    depende_de: Unidad;

    @OneToMany(() => Unidad, unidad => unidad.depende_de)
    dependencias: Unidad[];

    @ManyToOne(() => TipoUnidad, tipoUnidad => tipoUnidad.unidades, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_tipo_unidad' })
    tipo_unidad: TipoUnidad;

    @OneToMany(() => CargoIntermedio, cargos_intermedios => cargos_intermedios.unidad)
    cargos_intermedios: CargoIntermedio[];

    @OneToMany(() => AdministrativoCargoRegularUnidad, administrativo_cargo_regular_unidades => administrativo_cargo_regular_unidades.unidad)
    administrativo_cargo_regular_unidades: AdministrativoCargoRegularUnidad[];
}