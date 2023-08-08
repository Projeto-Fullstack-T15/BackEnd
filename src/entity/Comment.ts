import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Announcement } from "./Announcement";
import { User } from "./User";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn()
  ID: number;

  // @ManyToOne(() => Announcement, (announcement) => announcement.comments)
  // @JoinColumn({ name: "AnnouncementID" })
  // announcement: Announcement;

  // @ManyToOne(() => User, (user) => user.comments)
  // @JoinColumn({ name: "UserID" })
  // user: User;

  @Column("text")
  Text: string;
}
