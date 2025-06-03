import { IsString } from "class-validator";

export class CreateOrganizationDto {
    @IsString()
    type: string;

    @IsString()
    description: string;
}