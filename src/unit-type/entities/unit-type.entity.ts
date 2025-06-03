import { Unit } from "src/unit/entities/unit.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UnitType {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique:true })
    name: string;

    @Column({ nullable:true })    
    description: string;

    @Column({ nullable: false })
    type: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Unit, (unit) => unit.unitType)
    unit: Unit;

}
