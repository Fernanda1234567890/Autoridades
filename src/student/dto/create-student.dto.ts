import { IsString } from "class-validator";

export class CreateStudentDto {
    @IsString()
    career: string;

    @IsString()
    person_id: string;
}