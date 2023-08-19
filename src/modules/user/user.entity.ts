import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	JoinColumn,
} from "typeorm";
import { Account } from "../account/account.entity";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column()
	name: string;

	@Column({ unique: true })
	cpf: string;

	@Column({ type: "date" })
	birthday: Date;

	@Column({ type: "text" })
	description: string;

	@OneToOne(() => Account)
	@JoinColumn({ name: "accountId" })
	account: Account;
}
