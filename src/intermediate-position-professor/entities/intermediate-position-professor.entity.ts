import { IntermediatePosition } from "../../intermediate-position/entities/intermediate-position.entity";
import { Professor } from "../../professor/entities/professor.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class IntermediatePositionProfessor {

    @PrimaryGeneratedColumn('uuid') 
    id: string;

    @Column ()
    regular_position_id: string;

    @Column()
    unit_id: Number;

    @Column()
    administrative_id: number;

    @Column({ nullable: true })
    entry_date: Date;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @ManyToOne(() => IntermediatePosition, intermediatePosition => intermediatePosition.professor)
    @JoinColumn({ name: 'intermediate_position_id' })
    intermediatePosition: IntermediatePosition;

    @ManyToOne(() => Professor, professor => professor.intermediatePositionProfessors)
    @JoinColumn({ name: 'professor_id' })
    professor: Professor;

}
