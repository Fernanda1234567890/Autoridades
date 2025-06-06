
import { AdministrativeRegularPositionUnit } from "../../administrative-regular-position-unit/entities/administrative-regular-position-unit.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class RegularPosition {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    hierachical_level: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => AdministrativeRegularPositionUnit,administrativeRegularPositionUnit => administrativeRegularPositionUnit.regularPosition)
    administrativeRegularPositionUnits: AdministrativeRegularPositionUnit;

}
 