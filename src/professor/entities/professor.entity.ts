import { IntermediatePositionProfessor } from "src/intermediate-position-professor/entities/intermediate-position-professor.entity";
import { Person } from "src/person/entities/person.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Professor {

    @PrimaryGeneratedColumn('uuid') 
    id: string;

    @Column({ nullable: false })
    career: string;

    @Column({ nullable: true })
    person_id: number;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @OneToOne(() => Person, (person) => person.professor) 
    @JoinColumn({ name: 'person_id' })
    person: Person;

    @OneToMany(() => IntermediatePositionProfessor, itermediatePositionProfessor => itermediatePositionProfessor.professor)
    intermediatePositionProfessors: IntermediatePositionProfessor;

}
