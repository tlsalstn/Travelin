import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Share extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.shares)
    @JoinColumn({ name: "userId" })
    userId!: string;

    @Column()
    title!: string;

    @Column({ nullable: true })
    content!: string;

    @Column()
    points!: string;

    @CreateDateColumn({type: "timestamp", name: "created"})
    created!: Date;
}