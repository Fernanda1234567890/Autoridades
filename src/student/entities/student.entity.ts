import { Person } from "src/person/entities/person.entity";
import { Column, CreateDateColumn, Entity,JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Student {

     @PrimaryGeneratedColumn() 
     ru: number;

     @Column({ nullable: false })
     career: string;

     @Column()
     person_id: string;

     @CreateDateColumn()
     createAt: Date;

     @UpdateDateColumn()
     updateAt: Date;

     @OneToOne(() => Person, (person) => person.student)
     @JoinColumn({ name: 'person_id' })
     person: Person;

}
