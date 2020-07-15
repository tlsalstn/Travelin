import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
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

    @Column({ default: false })
    isAdmin!: boolean;

    @OneToMany(() => Share, share => share.userId)
    shares!: Share[];
}
