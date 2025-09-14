import { PartialType } from '@nestjs/mapped-types';
import { CreateAdministrativoDto } from './create-administrativo.dto';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAdministrativoDto extends PartialType(CreateAdministrativoDto) {
    
    @IsOptional()
    @IsString()
    carrera?: string;
   
    @IsOptional()
    @IsNumber()
    ru?: number;
    
    @IsOptional()
    @IsNumber()
    id_persona?: number;
    
    @IsOptional()
    @IsBoolean({message: 'El estado debe ser true o false'})
    estado?: boolean;

}
