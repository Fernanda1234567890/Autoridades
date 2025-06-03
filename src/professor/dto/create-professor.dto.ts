import { IsString, IsOptional, IsNumber } from "class-validator";

export class CreateProfessorDto {
    @IsString()
    career: string;

    @IsNumber()
    @IsOptional()
    person_id: number;
}