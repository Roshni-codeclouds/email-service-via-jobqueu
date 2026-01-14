import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { ReportProcessor } from './report.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'report-queue',
    }),
  ],
  controllers: [ReportController],
  providers: [ReportService, ReportProcessor],
})
export class ReportModule { }
