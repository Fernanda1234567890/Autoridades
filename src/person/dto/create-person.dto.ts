import { IsString, IsOptional, IsEmail, IsNumber, IsDateString } from "class-validator";

export class CreatePersonDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    last_name: string;

    @IsString()
    @IsOptional()
    ci: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsNumber()
    @IsOptional()
    phone_number: number;

    @IsString()
    @IsOptional()
    address: string;

    @IsDateString()
    @IsOptional()
    date_of_birth: Date;

    @IsString()
    image: string;

    @IsString()
    type: string;
}