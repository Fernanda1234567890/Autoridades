import { IsDateString } from 'class-validator';

export class CreatePersonaDto {
    id?: number;
    nombres: string;
    apellidos: string;
    ci: string;
    email: string;
    telefono: number;
    direccion: string;

    @IsDateString()
    fecha_nac: string;
}
