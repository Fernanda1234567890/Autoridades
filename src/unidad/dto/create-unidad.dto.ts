export class CreateUnidadDto {
    id?: number;
    nombre: string;
    descripcion: string;
    responsable: string;
    id_unidad?: number;
    id_tipo_unidad: number;
    estado: boolean;
}
