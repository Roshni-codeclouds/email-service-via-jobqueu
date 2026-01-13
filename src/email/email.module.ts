import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { EmailService } from './email.service';
import { EmailProcessor } from './email.processor';
import { ConfigModule } from '@nestjs/config';
import { EmailController } from './email.controller';

@Module({
    imports: [
        ConfigModule,
        BullModule.registerQueue({
            name: 'email-queue',
        }),
    ],
    providers: [EmailService, EmailProcessor],
    controllers: [EmailController],
    exports: [EmailService],
})
export class EmailModule { }
