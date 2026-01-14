import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailJobData } from './dto/email.dto';
import { Logger } from '@nestjs/common';

@Processor('email-queue')
export class EmailProcessor extends WorkerHost {
    private readonly logger = new Logger(EmailProcessor.name);

    constructor(private readonly mailerService: MailerService) {
        super();
    }

    async process(job: Job<EmailJobData>): Promise<any> {
        this.logger.log(`Processing email job ${job.id} for ${job.data.to}`);

        try {
            const { to, subject, text, html, template, context, attachments } = job.data;

            const info = await this.mailerService.sendMail({
                to,
                subject,
                text,
                html,
                template, 
                context, 
                attachments,
            });

            this.logger.log(`Email sent: ${info.messageId}`);
            return info;
        } catch (error) {
            this.logger.error('Failed to send email', error.stack);
            throw error;
        }
    }
}
