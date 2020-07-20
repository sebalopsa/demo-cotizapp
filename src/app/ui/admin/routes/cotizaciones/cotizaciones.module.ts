import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2Rut } from 'ng2-rut';
import { SharedModule } from '../shared/shared.module'
import { CotizacionesRoutingModule } from './cotizaciones-routing.module';
//COMPONENTS
import { CotizacionesComponent } from './cotizaciones.component';
//Cotizaciones Component
import { InicioComponent } from './inicio/inicio.component';
import { NuevaCotizacionComponent } from './nueva-cotizacion/nueva-cotizacion.component';
//Inicio Component
import { VistaGeneralSectionComponent } from './inicio/vista-general-section/vista-general-section.component';
import { CotizacionesSectionComponent } from './inicio/cotizaciones-section/cotizaciones-section.component';
//Cotizaciones Section Component
import { TableCotizacionesComponent } from './inicio/cotizaciones-section/table-cotizaciones/table-cotizaciones.component';
//Nueva Cotizacion Component
import { FormEmpresaComponent } from './nueva-cotizacion/form-empresa/form-empresa.component';
import { FormFechaComponent } from './nueva-cotizacion/form-fecha/form-fecha.component';
import { FormClienteComponent } from './nueva-cotizacion/form-cliente/form-cliente.component';
import { FormServicioComponent } from './nueva-cotizacion/form-servicio/form-servicio.component';
import { FormDetalleComponent } from './nueva-cotizacion/form-detalle/form-detalle.component';
import { FormNotasComponent } from './nueva-cotizacion/form-notas/form-notas.component';
import { FormTotalesComponent } from './nueva-cotizacion/form-totales/form-totales.component';


@NgModule({
  declarations: [
    CotizacionesComponent,

    InicioComponent,
    NuevaCotizacionComponent,

    VistaGeneralSectionComponent,
    CotizacionesSectionComponent,
    
    TableCotizacionesComponent,

    FormEmpresaComponent,
    FormFechaComponent,
    FormClienteComponent,
    FormServicioComponent,
    FormDetalleComponent,
    FormNotasComponent,
    FormTotalesComponent,
  ],
  imports: [
    CommonModule,
    CotizacionesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2Rut,
    SharedModule
  ]
})
export class CotizacionesModule { }
