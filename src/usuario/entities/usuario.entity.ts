import { Persona } from "src/persona/entities/persona.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios')
export class Usuario {
      @PrimaryGeneratedColumn()
      id: number;
    
      @Column({ unique: true })
      email: string;
    
      @Column()
      password: string;
    
      @Column()
      name: string;
    
      @Column({ type: 'enum', enum: ['admin', 'usuario'], default: 'usuario' })
      role: 'admin' | 'usuario';
      
      @Column({ type: 'integer', unique: true, nullable: true }) 
      id_persona: number;
    
      @OneToOne(() => Persona, { nullable: true }) // opcional
      @JoinColumn({ name: 'id_persona' })
      persona?: Persona;
}
