import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Notice } from "./Notice";

@Entity()
export class Admin extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId!: string;

    @Column()
    password!: string;

    @Column()
    nickName!: string;

    @OneToMany(
        () => Notice,
        notice => notice.author
    )
    notices!: Notice[];
}