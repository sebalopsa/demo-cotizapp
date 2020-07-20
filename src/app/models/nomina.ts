export interface ItemNomina {
    rut: string, // this.limpiarRut(val['RUT']),
    anticipo: number,//val['ANTICIPO'],
    finDeMes: number,//val['FIN DE MES'],
    extra: number,//val['EXTRA'],
    imponible: number,//val['IMPONIBLE'],
    afp: number,//val['AFP'],
    afc: number,//val['AFC'],
    salud: number,//val['ISAPRE/FONASA'],
    ccaf: number,//val['CCAF'],
    adicionalSalud: number,//val['ADICIONAL ISAPRE'],
    prestamo: number,//val['PRESTAMO'],
    sis: number,//val['SIS'],
    afc2: number,//val['AFC2'],
    mutual: number,//val['MUTUAL'],
    leyesSociales: number,//val['LEYES SOCIALES'],
    impuestoUnico: number,//val['IMPUESTO UNICO'],
    total: number,//val['TOTAL MES'],
}

export interface ResumenNomina {
    registros?: number,
    anticipo?: number,
    finDeMes?: number,
    leyesSociales?: number,
    impuestoUnico?: number,
    total?: number,

    // Otros..
}

export interface NominaMensual {
    id?: any,
    year?: string,
    month?: string,
    monthStr?: string,
    resumen?: ResumenNomina,
    items?: ItemNomina[],
    deleted?: boolean,
    timestamp?: number
}
