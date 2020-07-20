export interface Proyecto {
    id?: string,
    nombre: string,
    descripcion: string,
    inicio?: number,
    termino?: number,
    estado?: string,
    cotizacion: {
        folio: string,
        monto: number,
        url: string
    },
    pagos?: {
        estadoPago: {
            folio: string,
            fecha: number,
            monto: number,  
            url: string        
        }
        factura?:{
            folio: string,
            fecha: number,
            monto: number,
            url: string
        }
    }[],
    documentos?: any[],
    termofusiones?: {
        desde: number,
        hasta: number,
        cantidad: number,
        diametro: string
    }[],
    geomembranas?: {
        desde: number,
        hasta: number,
        cantidad: number
    }[],
    gastos?: {
        item: string,
        categoria: string,
        registro: number,
        monto: number,
        adjunto: string
    }[]
    metadata?:{
        createdAt: number,
        timestamp: number,
        deleted: boolean
    }
    ///// Lo que sigue es para evitar errores de integración con logica enterior (redux)
    timestamp?: number,
    deleted?: boolean,
    trabajadores?:{
        nombre: string,
        rut: string
    }[]
}

