import { IsString, IsOptional } from "class-validator";

export class CreateUnitTypeDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    type: string;
}