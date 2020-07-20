export interface Log {
    id: string,
    tipo: 'CREA' | 'MODIFICA' | 'ELIMINA',
    coleccion: 'presupuestos' | 'cotizaciones',
    documento: string,
    usuario: string,
    timestamp: number,
}