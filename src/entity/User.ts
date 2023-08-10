// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   OneToMany,
//   OneToOne,
//   JoinColumn,
// } from "typeorm";
// import { Announcement } from "./Announcement";
// // import { Comment } from "./Comment";
// // import { Address } from "./Address";
// // import { Account } from "./Account";

// @Entity("users")
// export class User {
//   @PrimaryGeneratedColumn("increment")
//   ID: number;

//   @Column()
//   Name: string;

//   @Column({ unique: true })
//   CPF: string;

//   @Column()
//   Phone: string;

//   @Column({ type: "date" })
//   BirthDate: Date;

//   @Column("text")
//   Description: string;

//   // @OneToMany(() => Announcement, (announcement) => announcement.user)
//   // announcements: Announcement[];

//   // @OneToMany(() => Comment, (comment) => comment.user)
//   // comments: Comment[];

//   // @OneToOne(() => Account)
//   // @JoinColumn({ name: "AccountID" })
//   // account: Account;

//   // @OneToOne(() => Address)
//   // @JoinColumn({ name: "AddressID" })
//   // address: Address;
// }
