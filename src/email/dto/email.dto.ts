import { IsEmail, IsNotEmpty, IsOptional, IsString, IsObject, IsArray } from 'class-validator';

export class EmailJobData {
    @IsEmail()
    @IsNotEmpty()
    to: string;

    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    @IsOptional()
    text?: string;

    @IsString()
    @IsOptional()
    html?: string;

    @IsString()
    @IsOptional()
    template?: string;

    @IsObject()
    @IsOptional()
    context?: Record<string, any>;

    @IsArray()
    @IsOptional()
    attachments?: Array<{
        filename: string;
        path?: string;
        content?: string;
        encoding?: string;
    }>;
}
