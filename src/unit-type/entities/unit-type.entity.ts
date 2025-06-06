import { Factory } from "nestjs-seeder";
import { Unit } from "../../unit/entities/unit.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UnitType {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ unique:true })
    name: string;

    @Column({ nullable:true })    
    description: string;

    @Column({ unique: true, nullable: false, enum: ['unidad_mayor', 'unidad_intermedia', 'unidad_subdependiente'] })
    type: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Unit, (unit) => unit.unitType)
    units: Unit[];	

}
