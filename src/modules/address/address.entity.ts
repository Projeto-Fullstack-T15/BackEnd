import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Account } from "../account/account.entity";

@Entity("addresses")
export class Address {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    zipCode: string;

    @Column()
    state: string;

    @Column()
    city: string;

    @Column()
    street: string;

    @Column()
    number: string;

    @Column({ nullable: true, type: "varchar", length: 255 })
    complement: string | null;

    @OneToOne(() => Account, (account) => account.address)
    account: Account;
}
