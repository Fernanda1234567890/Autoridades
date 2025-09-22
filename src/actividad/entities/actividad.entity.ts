import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity('actividades')
export class Actividad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accion: string;

  @CreateDateColumn()
  fecha: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.actividades)
  usuario: Usuario;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
