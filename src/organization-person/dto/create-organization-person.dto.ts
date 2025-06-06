import { IsNumber, IsOptional } from "class-validator";

export class CreateOrganizationPersonDto {
    @IsNumber()
    organization_id: number;

    @IsNumber()
    @IsOptional()
    person_id: string;
}