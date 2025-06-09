import { Student } from "../../student/entities/student.entity";
import { Administrative } from "../../administrative/entities/administrative.entity";
import { Professor } from "../../professor/entities/professor.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrganizationPerson } from "../../organization-person/entities/organization-person.entity";

@Entity()
export class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ nullable: false })
  ci: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: false })
  phone_number: number;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  date_of_birth: Date;

  @Column()
  image: string;

  @Column()
  type: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToOne(() => Student, (student) => student.person )
  student: Student;

  @OneToOne(() => Professor, (professor) => professor.person )
  professor: Professor;

  @OneToOne(() => Administrative, (administrative) => administrative.person )
  administrative: Administrative;

  @OneToMany(() => OrganizationPerson, organizationPerson => organizationPerson.person)
  organizationPersons: OrganizationPerson;

}
