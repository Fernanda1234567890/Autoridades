import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UnitType } from "../../unit-type/entities/unit-type.entity";
import { IntermediatePosition } from "../../intermediate-position/entities/intermediate-position.entity";
import { AdministrativeRegularPositionUnit } from "../../administrative-regular-position-unit/entities/administrative-regular-position-unit.entity";
@Entity()
export class Unit {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique:false })
    name: string;

    @Column({ nullable: false })
    type: string;

    @Column({ nullable:true })    
    description: string;

    @Column({ nullable: true })
    logo: string;

    @Column({ nullable:false })    
    responsible: string;

    @Column({ type: 'uuid' , nullable: true })
    depends_on: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => UnitType, (unitType) => unitType.units)
    unitType: UnitType;

    @OneToOne(() => IntermediatePosition, (intermediatePosition) => intermediatePosition.unit)
    intermediatePosition: IntermediatePosition;

    @OneToOne(() => AdministrativeRegularPositionUnit, (administrativeRegularPositionUnit) => administrativeRegularPositionUnit.unit)
    administrativeRegularPositionUnit: AdministrativeRegularPositionUnit;


    /////////
    @ManyToOne(() => Unit, (unit) => unit.subunits, { nullable: true })
    @JoinColumn({ name: 'depends_on' }) 
    parentUnit: Unit;

  
    @OneToMany(() => Unit, (unit) => unit.parentUnit)
    subunits: Unit[];	
    ////////
    


    }