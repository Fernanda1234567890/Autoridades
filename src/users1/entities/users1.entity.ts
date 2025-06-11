
import  { Column, DeleteDateColumn, Entity } from 'typeorm';
@Entity()  
export class Users1 {
    id:number

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()   
    rol: string;

    @DeleteDateColumn()
    deletedAt: Date;
}
