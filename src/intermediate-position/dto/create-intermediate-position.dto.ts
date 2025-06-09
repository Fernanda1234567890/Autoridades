import { IsString, IsOptional, IsNumber } from "class-validator";

export class CreateIntermediatePositionDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    hierachical_level: string;

    @IsNumber()
    @IsOptional()
    unit_id: string;
}