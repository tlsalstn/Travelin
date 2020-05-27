import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    userId!: string;

    @Column()
    password!: string;

    @Column()
    name!: string;

    @Column({ unique: true })
    nickName!: string;

    @Column({ unique: true })
    email!: string;
}
