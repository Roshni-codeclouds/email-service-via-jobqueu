import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { EmailJobData } from './dto/email.dto';

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);

    constructor(@InjectQueue('email-queue') private emailQueue: Queue) { }

    async sendEmail(data: EmailJobData) {
        await this.emailQueue.add('send-email', data);
        this.logger.log(`Added email job for ${data.to} to the queue`);
    }
}
