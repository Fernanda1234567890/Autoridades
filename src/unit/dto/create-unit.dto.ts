import { IsString, IsOptional } from "class-validator";

export class CreateUnitDto {
    @IsString()
    name: string;

    @IsString()
    type: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    logo: string;

    @IsString()
    responsible: string;

    @IsString()
    @IsOptional()
    depends_on: string;

    @IsString()
    @IsOptional()
    unitTypeId: string;

    @IsString()
    @IsOptional()
    intermediatePositionId: string;

    @IsString()
    @IsOptional()
    administrativeRegularPositionUnitId: string;

    @IsString()
    @IsOptional()
    parentUnitId: string;
}