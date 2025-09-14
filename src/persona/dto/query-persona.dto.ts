import { IsOptional, IsString, IsIn, IsNumber, Min, IsBooleanString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryPersonaDto {
  @ApiPropertyOptional({ description: 'Número de página', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Límite de resultados por página', default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Filtrar por nombres' })
  @IsOptional()
  @IsString()
  nombres?: string;

  @ApiPropertyOptional({ description: 'Filtrar por apellidos' })
  @IsOptional()
  @IsString()
  apellidos?: string;

  @ApiPropertyOptional({ description: 'Filtrar por número de cédula de identidad' })
  @IsOptional()
  @IsString()
  ci?: string;

  @ApiPropertyOptional({ description: 'Filtrar por email' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ description: 'Filtrar por dirección' })
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiPropertyOptional({ description: 'Filtrar por fecha de nacimiento (formato: YYYY-MM-DD)' })
  @IsOptional()
  @IsString()
  fecha_nac?: string;

  @ApiPropertyOptional({ 
    description: 'Filtrar por estado', 
    enum: ['activo', 'inactivo', 'todos'],
    default: 'todos'
  })
  @IsOptional()
  @IsIn(['activo', 'inactivo', 'todos'])
  estado?: 'activo' | 'inactivo' | 'todos' = 'todos';

  @ApiPropertyOptional({ 
    description: 'Campo por el cual ordenar', 
    default: 'id',
    enum: ['id', 'nombres', 'apellidos', 'ci', 'email', 'fecha_nac']
  })
  @IsOptional()
  @IsString()
  sortBy?: string = 'id';

  @ApiPropertyOptional({ 
    description: 'Dirección del ordenamiento', 
    enum: ['ASC', 'DESC'],
    default: 'ASC'
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'ASC';
}