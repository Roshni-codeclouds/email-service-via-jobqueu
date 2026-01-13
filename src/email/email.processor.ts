import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { EmailJobData } from './dto/email.dto';

@Processor('email-queue')
export class EmailProcessor extends WorkerHost {
    private transporter;

    constructor(private configService: ConfigService) {
        super();
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('SMTP_HOST'),
            port: this.configService.get<number>('SMTP_PORT'),
            secure: this.configService.get<boolean>('SMTP_SECURE', false),
            auth: {
                user: this.configService.get<string>('SMTP_USER'),
                pass: this.configService.get<string>('SMTP_PASS'),
            },
        });
    }

    async process(job: Job<EmailJobData>): Promise<any> {
        console.log(`Processing email job ${job.id} for ${job.data.to}`);

        try {
            const info = await this.transporter.sendMail({
                from: this.configService.get<string>('SMTP_FROM', '"No Reply" <noreply@example.com>'),
                to: job.data.to,
                subject: job.data.subject,
                text: job.data.text,
                html: job.data.html,
            });
            console.log(`Email sent: ${info.messageId}`);
            return info;
        } catch (error) {
            console.error('Failed to send email:', error);
            throw error;
        }
    }
}
