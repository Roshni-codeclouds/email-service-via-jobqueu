import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';

@Processor('report-queue')
export class ReportProcessor extends WorkerHost {
    private readonly logger = new Logger(ReportProcessor.name);

    async process(job: Job<any>): Promise<any> {
        this.logger.log(`Starting background report generation (Job ${job.id})...`);

        // Simulate a long-running task (e.g., 5 seconds)
        await new Promise((resolve) => setTimeout(resolve, 5000));

        this.logger.log(`Report generation completed (Job ${job.id})!`);
        return { result: 'Report generated successfully' };
    }
}
