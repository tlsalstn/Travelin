import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Notice } from "./Notice";
import { Share } from "./Share";

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

    @Column()
    isAdmin!: boolean;

    @OneToMany(() => Notice, notice => notice.userId)
    notices!: Notice[];

    @OneToMany(() => Share, share => share.userId)
    shares!: Share[];
}
