import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './modules/account/account.module';
import { UserModule } from './modules/user/user.module';
import { AddressModule } from './modules/address/address.module';
import { AnnouncementsModule } from './modules/announcements/announcements.module';
import { CommentsModule } from './modules/comments/comments.module';
import { MailService } from './utils/mail/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
	imports: [
		AccountModule,
		UserModule,
		AddressModule,
		AnnouncementsModule,
		CommentsModule,
		MailerModule.forRoot({
			transport: {
				host: "smtp.gmail.com",
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASS
				}
			}
		})
	],
	controllers: [AppController],
	providers: [AppService, MailService],
})
export class AppModule {
	constructor() {
		console.log(process.env.SMTP_USER, process.env.SMTP_PASS)
	}
}
