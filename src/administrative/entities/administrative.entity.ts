import { AdministrativeRegularPositionUnit } from "src/administrative-regular-position-unit/entities/administrative-regular-position-unit.entity";
import { Person } from "src/person/entities/person.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Administrative {
          
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Column({ nullable: false })
  area:string;

  @Column({ nullable: false })
  person_id:number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToOne(() => Person, (person) => person.administrative)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @OneToMany(() => AdministrativeRegularPositionUnit, administrativeRegularPositionUnit => administrativeRegularPositionUnit.administrative)
  regularPositionUnits: AdministrativeRegularPositionUnit;

}
