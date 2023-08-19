import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
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

    @Column({})
    accountType: AccountType;

    @OneToOne(() => User)
    @JoinColumn({ name: "userId" })
    user: User;

    @OneToMany(() => Announcement, (announcement) => announcement.user)
    announcements: Announcement[];

    @OneToOne(() => Address)
    @JoinColumn({ name: "addressId" })
    address: Address;

    //   @OneToMany(() => Comment, (comment) => comment.user)
    //   comments: Comment[];
}
