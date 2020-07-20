export interface State {
    empresas?: object
}

export const initialState: State = {
    empresas: {
        111111111: {
            nombre: "Mi Empresa Spa",
            rut: "111111111",
            direccion: "Dirección sin calle #111",
            telefono: "+569 1234 5678",
            email: "contacto@miempresa.cl"
        },
        768505977: {
            nombre: "ROCCFLEX SERVICIOS INTEGRALES EN TERMOFUSIÓN LIMITADA",
            rut: "768505977",
            direccion: "Santa Filomena PC 18 LT B-14 - Pan de Azucar, Coquimbo",
            telefono: "+569 8223 4760",
            email: "jroccflex@gmail.com"
        }
    }


}