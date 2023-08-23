import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { Announcement } from "../modules/announcement/announcement";
import { hash, hashSync } from "bcryptjs";
import * as bcrypt from "bcryptjs";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  ID: number;

  @Column()
  Name: string;

  @Column({ unique: true })
  CPF: string;

  @Column()
  email: string;
  @Column()
  Phone: string;

  @Column()
  Password: string;

  @Column({ type: "date" })
  BirthDate: string | Date;

  @Column("text")
  Description: string;
  @Column({ nullable: true })
  token?: string;

  @OneToMany(() => Announcement, (announcement) => announcement.user)
  announcements: Announcement[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isHash = bcrypt.getRounds(this.Password);
    if (!isHash) {
      this.Password = hashSync(this.Password, 10);
    }
  }
}
