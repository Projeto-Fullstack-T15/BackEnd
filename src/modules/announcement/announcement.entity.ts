import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { User } from "../user/user.entity";
//import { Comment } from "../../entity/Comment";

@Entity("announcements")
export class Announcement {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    brand: string;

    @Column()
    model: string;

    @Column()
    color: string;

    @Column()
    year: number;

    @Column()
    fuelType: string;

    @Column()
    mileage: number;

    @Column("decimal", { precision: 10, scale: 2 })
    price: number;

    @Column("text")
    description: string;

    @ManyToOne(() => User, (user) => user.announcements)
    @JoinColumn({ name: "UserID" })
    user: User;

    //@OneToMany(() => Comment, (comment) => comment.announcement)
    // comments: Comment[];
}
