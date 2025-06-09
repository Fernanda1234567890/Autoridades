import { IsNumber, IsOptional } from "class-validator";

export class CreateOrganizationPersonDto {
    @IsNumber()
    organization_id: string;

    @IsNumber()
    @IsOptional()
    person_id: string;
}