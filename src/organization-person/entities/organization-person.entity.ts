import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Person } from "../../person/entities/person.entity";
import { Organization } from "../../organization/entities/organization.entity";

@Entity()
export class OrganizationPerson {

    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column({ nullable: false })
    organization_id: number;

    @Column({ nullable: true })
    person_id: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @ManyToOne(() => Person, person => person.organizationPersons)
    @JoinColumn({ name: 'person_id' })
    person: Person;

    @ManyToOne(() => Organization, organization => organization.organizationPersons)
    @JoinColumn({ name: 'organization_id' })
    organization: Organization;

}
