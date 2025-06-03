import { IsString, IsInt, IsOptional } from "class-validator";
export class CreateAdministrativeDto {

        @IsString()
        @IsOptional()
        area:string;
    
        @IsInt()
        @IsOptional()
        person_id: number;
}
