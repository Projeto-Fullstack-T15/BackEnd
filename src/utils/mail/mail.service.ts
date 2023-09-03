import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as Mailgen from 'mailgen';

const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Recuperação de senha',
        link: 'http://localhost:3000'
    }
});

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService
    ) { }

    public async sendEmail(to: string, subject: string, text: string) {
        await this.mailerService.sendMail({ to, subject, html: text })
            .then(() => console.log("Email has been successfully sent"))
            .catch((err) => {
                console.log("Email was failed to send");
                console.error(err);
            });
    }

    public async resetPasswordTemplate(emaiL: string, token: string) {
        const emailObject = {
            body: {
                intro: "You have received this because a password recovery request was requested for this email.",
                action: {
                    instructions: "Click the button below to recover your password: ",
                    button: {
                        color: "#DC4D2F",
                        text: "Recover your password",
                        link: `http://localhost:3000/reset-password/${token}`
                    }
                },
                outro: 'If you have not sent this request, this email should be ignored.'
            }
        };

        const emailBody = mailGenerator.generate(emailObject);

        const emailTemplate = {
            to: emaiL,
            subject: "Recuperar senha - Kenzie T15",
            text: emailBody
        };

        return emailTemplate;
    }
}
