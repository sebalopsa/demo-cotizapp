export interface Movimiento {
    id: string,
    proyecto: string, //ID DEL PROYECTO
    fecha: number,
    tipo: string,  // TIPO: ENTRADA, SALIDA DE PROYECTO
    trabajadores: string[], // SOLO EL RUT DE LOS TRABAJADORES
    deleted?: boolean,
    timestamp?: number
}
