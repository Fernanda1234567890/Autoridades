import { IsString, IsNumber, IsOptional, IsDateString } from "class-validator";

export class CreateIntermediatePositionProfessorDto {
    @IsString()
    @IsOptional()
    regular_position_id: string;

    @IsNumber()
    @IsOptional()
    unit_id: number;

    @IsNumber()
    @IsOptional()
    administrative_id: number;

    @IsDateString()
    @IsOptional()
    entry_date: Date;

    @IsString()
    @IsOptional()
    intermediate_position_id: string;

    @IsString()
    @IsOptional()
    professor_id: string;
}