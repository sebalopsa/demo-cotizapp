import { Cliente } from './cliente'
import { Detalle } from './detalle'

export interface EstadoPago {
    cliente?: Cliente,
    detalle?: Detalle[],
    divisa?: 'USD' | 'CLP' | 'UF',
    emisor?: {
        nombre?: string,
        rut?: string,
        direccion?: string,
        email?: string,
        telefono?: string
    }
    estado?: string,
    fecha?: number,
    fechaStr?: string,
    folio?: number,
    id?: string,
    iva?: number,
    notas?: string,
    plazo?: number,
    servicio?: string,
    total?: number,
    totalNeto?: number,
    url?: string,
    vigencia?: number,
    porcentajeUtilidad?: number,
    montoUtilidad?: number,
    subtotal?: number
}