import { Person } from "../../person/entities/person.entity";
import { Column, CreateDateColumn, Entity,JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Student {

     @PrimaryGeneratedColumn() 
     ru: number;

     @Column('uuid')
     person_id: string;

     @Column({ nullable: false })
     career: string;

     @CreateDateColumn()
     createAt: Date;

     @UpdateDateColumn()
     updateAt: Date;

     @OneToOne(() => Person, (person) => person.student)
     @JoinColumn({ name: 'person_id' })
     person: Person;

}
