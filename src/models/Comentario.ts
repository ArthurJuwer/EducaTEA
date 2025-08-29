import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity('comentario')
export class Comentario {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', length: 255, nullable: false})
    name:string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    comentarioEscrito!: string;

    // @ManyToOne(() => User, user => user.comentarios, { nullable: false, onDelete: 'CASCADE' })
    // @JoinColumn({ name: 'user_id' })  // nome da coluna FK na tabela comentario
    // user!: User;

    constructor(comentarioEscrito: string, name: string) {
        this.comentarioEscrito = comentarioEscrito;
        this.name = name;
    }
}
