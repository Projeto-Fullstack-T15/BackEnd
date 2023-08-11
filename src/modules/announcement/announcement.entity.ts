import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    //ManyToOne,
    //JoinColumn,
    //OneToMany,
} from "typeorm";
// import { User } from "./User";
// import { Comment } from "./Comment";

@Entity("announcements")
export class Announcement {
    @PrimaryGeneratedColumn("increment")
    ID: number;

    @Column()
    Brand: string;

    @Column()
    Model: string;

    @Column()
    Color: string;

    @Column()
    Year: number;

    @Column()
    FuelType: string;

    @Column()
    Mileage: number;

    @Column("decimal", { precision: 10, scale: 2 })
    Price: number;

    @Column("text")
    Description: string;

    // @ManyToOne(() => User, (user) => user.announcements)
    // @JoinColumn({ name: "UserID" })
    // user: User;

    // @OneToMany(() => Comment, (comment) => comment.announcement)
    // comments: Comment[];
}