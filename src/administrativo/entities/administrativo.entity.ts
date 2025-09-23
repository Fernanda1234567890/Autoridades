import { AdministrativoCargoRegularUnidad } from "src/administrativo-cargo-regular-unidad/entities/administrativo-cargo-regular-unidad.entity";
import { Persona } from "src/persona/entities/persona.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('administrativos')

export class Administrativo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer', unique: true })
    id_persona: number;
    
    @Column({ type: 'boolean', default: true})
    estado: boolean; 

    
    @OneToOne(() => Persona, persona => persona.administrativo)
    @JoinColumn({ name: 'id_persona' })
    persona: Persona;

    @OneToMany(() => AdministrativoCargoRegularUnidad, administrativo_cargo_regular_unidades => administrativo_cargo_regular_unidades.administrativo)
    administrativo_cargo_regular_unidades: AdministrativoCargoRegularUnidad[];
}
