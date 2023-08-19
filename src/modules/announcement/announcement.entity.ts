import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Account } from "../account/account.entity";

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

    @ManyToOne(() => Account, (account) => account.announcements, { cascade: true })
    @JoinColumn()
    account: Account;
}
