// import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { Comentario } from './Comentario';

// @Entity('users')
// export class User {
//     @PrimaryGeneratedColumn()
//     id!: number;

//     @Column({ type: 'varchar', length: 255, nullable: false })
//     name!: string;

//     @OneToMany(() => Comentario, comentario => comentario.user)
//     comentarios!: Comentario[];

//     constructor(name: string) {
//         this.name = name;
//     }
// }
