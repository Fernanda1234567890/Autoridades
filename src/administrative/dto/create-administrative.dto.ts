import { IsString, IsOptional } from "class-validator";
export class CreateAdministrativeDto {

    @IsString()
    @IsOptional()
    area: string;

    @IsString()
    @IsOptional()
    person_id: string;
}