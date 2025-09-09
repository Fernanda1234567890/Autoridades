import { AdministrativoCargoRegularUnidad } from "src/administrativo-cargo-regular-unidad/entities/administrativo-cargo-regular-unidad.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('cargos-regulares')
export class CargoRegular {
        @PrimaryGeneratedColumn()
        id: number;

        @Column({ type: 'varchar', unique: true })
        nombre: string;

        @Column({ type: 'text' })
        descripcion: string;
     

        @Column({ type: 'integer', nullable: true })
        nivel_jerarquico: number;

        @Column({ type: 'boolean', default: true })
        estado: boolean;

        @OneToMany(() => AdministrativoCargoRegularUnidad, administrativo_cargo_regular_unidades => administrativo_cargo_regular_unidades.cargo_regular)
        administrativo_cargo_regular_unidades: AdministrativoCargoRegularUnidad[];
}