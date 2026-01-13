import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailJobData } from './dto/email.dto';

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) { }

    @Post('send')
    async sendEmail(@Body() data: EmailJobData) {
        await this.emailService.sendEmail(data);
        return { message: 'Email job added to queue' };
    }
}
