import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class ReportService {
    private readonly logger = new Logger(ReportService.name);

    constructor(@InjectQueue('report-queue') private reportQueue: Queue) { }

    async generateReport() {
        await this.reportQueue.add('generate-report', {
            timestamp: new Date(),
            type: 'monthly-summary',
        });
        this.logger.log('Added report generation job to queue');
    }
}
