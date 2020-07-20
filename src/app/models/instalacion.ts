export interface Instalacion {
        id?: string,
        material?: string,
        proyecto?: string,
        fechaInicio?: number,
        fechaTermino?: number,
        cantidad?: number,
        tipo?: string,
        timestamp?: number,
        trabajadores?: string[],
        edit?: boolean
}
