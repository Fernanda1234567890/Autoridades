import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreatePersonaDto {
    id?: number;
    nombres: string;
    apellidos: string;
    ci: string;
    email: string;
    telefono?: number;
    direccion?: string;

    @IsOptional()
    @IsString()
    img?: string;

    @IsDateString()
    fecha_nac: string;
}
