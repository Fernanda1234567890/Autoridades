import { IntermediatePositionProfessor } from "src/intermediate-position-professor/entities/intermediate-position-professor.entity";
import { Unit } from "src/unit/entities/unit.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity () 
export class IntermediatePosition {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    hierachical_level: string;

    @Column({nullable: true })
    unit_id: number;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @OneToOne(() => Unit, (unit) => unit.intermediatePosition)
    @JoinColumn({ name: 'unit_id' })
    unit: Unit;
    
    @OneToMany(() => IntermediatePositionProfessor, intermediatePositionProfessor => intermediatePositionProfessor.intermediatePosition)
    professor: IntermediatePositionProfessor;

}
