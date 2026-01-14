import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
}
