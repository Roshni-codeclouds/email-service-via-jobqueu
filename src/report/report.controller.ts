import { Controller, Post } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
    constructor(private readonly reportService: ReportService) { }

    @Post('generate')
    async generateReport() {
        await this.reportService.generateReport();
        return { message: 'Report generation started in the background' };
    }
}
