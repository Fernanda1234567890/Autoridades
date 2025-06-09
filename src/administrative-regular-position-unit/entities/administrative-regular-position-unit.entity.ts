import { Unit } from "../../unit/entities/unit.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Administrative } from "../../administrative/entities/administrative.entity";
import { RegularPosition } from "../../regular-position/entities/regular-position.entity";

@Entity()   
export class AdministrativeRegularPositionUnit {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    regular_position_id: string; 

    @Column()
    units_id: string;

    @Column()
    administrative_id: string;

    @Column()
    entry_date: Date;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @OneToOne(() => Unit, (unit) => unit.administrativeRegularPositionUnit)
    @JoinColumn({ name: 'unit_id' })
    unit: Unit;

    @ManyToOne(() => Administrative, administrative => administrative.regularPositionUnits)
    @JoinColumn({ name: 'administrative_id' })
    administrative: Administrative;

    @ManyToOne(() => RegularPosition, regularPosition => regularPosition.administrativeRegularPositionUnits)
    @JoinColumn({ name: 'regular_position_id' })
    regularPosition: RegularPosition;

}
