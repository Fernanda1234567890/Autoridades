import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCarreraDto {
    id?: number;

    @IsString()
    nombre: string;

    @IsString()
    sigla: string;
    
    @IsOptional()
    @IsNumber()
    id_facultad?: number;     
}
