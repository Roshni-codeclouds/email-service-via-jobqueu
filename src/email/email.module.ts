import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { EmailService } from './email.service';
import { EmailProcessor } from './email.processor';
import { EmailController } from './email.controller';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'email-queue',
        }),
        MailerModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                transport: {
                    host: configService.get('SMTP_HOST'),
                    port: configService.get('SMTP_PORT'),
                    secure: configService.get('SMTP_PORT') === 465, // true for 465, false for other ports
                    auth: {
                        user: configService.get('SMTP_USER'),
                        pass: configService.get('SMTP_PASS'),
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                },
                defaults: {
                    from: configService.get('SMTP_FROM'),
                },
                template: {
                    dir: join(__dirname, 'templates'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [EmailService, EmailProcessor],
    controllers: [EmailController],
    exports: [EmailService],
})
export class EmailModule { }
