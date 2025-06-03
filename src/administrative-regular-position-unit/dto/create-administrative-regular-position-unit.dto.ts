import { IsString, IsDateString, IsOptional } from "class-validator";

export class CreateAdministrativeRegularPositionUnitDto {
    @IsString()
    @IsOptional()
    regular_position_id: string;

    @IsString()
    @IsOptional()
    units_id: string;

    @IsString()
    @IsOptional()
    administrative_id: string;

    @IsDateString()
    @IsOptional()
    entry_date: Date;
}