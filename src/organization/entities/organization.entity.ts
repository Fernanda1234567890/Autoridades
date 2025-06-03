import { OrganizationPerson } from "src/organization-person/entities/organization-person.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Organization {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({  nullable: false })
  type:string

  @Column({  nullable: false })
  description:string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
    
  @OneToMany(() => OrganizationPerson, organizationPerson => organizationPerson.organization)
  organizationPersons: OrganizationPerson;
}
