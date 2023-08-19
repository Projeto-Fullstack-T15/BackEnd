import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    OneToMany,
} from "typeorm";
import { User } from "../user/user.entity";
import { AccountType } from "./account.interfaces";
import { Announcement } from "../announcement/announcement.entity";
import { Address } from "../address/address.entity";

@Entity("accounts")
export class Account {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column({ enum: ["buyer", "announcer"], enumName: "AccountType" })
    accountType: AccountType;


    @OneToMany(() => Announcement, (announcement) => announcement.user)
    announcements: Announcement[];

    @OneToOne(() => User, (user) => user.account)
    user: User;

    @OneToOne(() => Address, (address) => address.account)
    address: Address;

    //   @OneToMany(() => Comment, (comment) => comment.user)
    //   comments: Comment[];
}
