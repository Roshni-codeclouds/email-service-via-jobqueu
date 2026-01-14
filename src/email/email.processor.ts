import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { EmailJobData } from './dto/email.dto';
import { Logger } from '@nestjs/common';

@Processor('email-queue')
export class EmailProcessor extends WorkerHost {
    private readonly logger = new Logger(EmailProcessor.name);
    private transporter: Transporter;

    constructor(private configService: ConfigService) {
        super();
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('SMTP_HOST'),
            port: this.configService.get<number>('SMTP_PORT'),
            secure: false, // true for 465, false for other ports
            auth: {
                user: this.configService.get<string>('SMTP_USER'),
                pass: this.configService.get<string>('SMTP_PASS'),
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    async process(job: Job<EmailJobData>): Promise<any> {
        this.logger.log(`Processing email job ${job.id} for ${job.data.to}`);

        try {
            const info = await this.transporter.sendMail({
                from: this.configService.get<string>('SMTP_FROM', '"No Reply" <noreply@example.com>'),
                to: job.data.to,
                subject: job.data.subject,
                text: job.data.text,
                html: job.data.html,
            });
            this.logger.log(`Email sent: ${info.messageId}`);
            return info;
        } catch (error) {
            this.logger.error('Failed to send email', error.stack);
            throw error;
        }
    }
}
