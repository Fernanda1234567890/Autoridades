import { IsString, IsOptional } from "class-validator";

export class CreateRegularPositionDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    hierachical_level: string;
}