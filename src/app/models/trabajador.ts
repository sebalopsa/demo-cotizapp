export interface Trabajador {
    id?:string,
    rut?: string,
    nombre?: string,
    apellidos?: string,
    fechaNacimiento?: number,
    direccion?: string,
    telefono?: string,
    email?: string,
    cuenta?:{
        banco?:string,
        tipo?:string,
        numero?:string
    },
    previsionSocial?:string,
    previsionSalud?:string,
    cargo?:string,
    empleador?:string,
    tipoContrato?:string,
    fechaIngreso?: number,
    medidasEpp?:{
        zapato?:number,
        overol?:string,
        geologo?:string,
        polera?:string,
        chaqueta?:string
    },
    fotoUrl?: string,
    virgin?: boolean,
    deleted?: boolean,
    timestamp?: number,
    documentos?: any[],
    proyecto?: {
        id: string,
        nombre: string
    }
    historial?: {
        fecha: number,
        proyectoId: string
    }[]
  }
