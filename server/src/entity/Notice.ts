import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Admin } from "./Admin";

@Entity()
export class Notice extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    author!: string;

    @Column()
    title!: string;

    @Column()
    content!: string;

    @ManyToOne(
        () => Admin,
        admin => admin.notices
    )
    admin!: Admin
}