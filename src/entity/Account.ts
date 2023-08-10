// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   OneToOne,
//   JoinColumn,
// } from "typeorm";
// import { User } from "./User";

// @Entity("accounts")
// export class Account {
//   @PrimaryGeneratedColumn("increment")
//   ID: number;

//   @Column({ unique: true })
//   Email: string;

//   @Column()
//   Password: string;

//   @Column()
//   AccountType: string;

//   // @OneToOne(() => User)
//   // @JoinColumn({ name: "UserID" })
//   // user: User;
// }
