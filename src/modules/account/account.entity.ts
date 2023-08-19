import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    OneToMany,
    JoinColumn,
} from "typeorm";
import { User } from "../user/user.entity";
import { Announcement } from "../announcement/announcement.entity";
import { Address } from "../address/address.entity";

export enum AccountType {
    BUYER = "buyer",
    ANNOUNCER = "announcer"
}

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

    @Column({ type: "enum", enum: AccountType })
    accountType: "buyer" | "announcer";

    @OneToMany(() => Announcement, (announcement) => announcement.account)
    announcements: Announcement[];

    @OneToOne(() => User, (user) => user.account)
    user: User;

    @OneToOne(() => Address, (address) => address.account)
    address: Address;
}
