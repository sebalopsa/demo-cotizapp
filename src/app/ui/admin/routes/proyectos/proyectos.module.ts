import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProyectosRoutingModule } from './proyectos-routing.module';
import { SharedModule } from '../shared/shared.module';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post',
  maxFilesize: 10,
  maxFiles: 5,
  acceptedFiles: 'image/*,application/pdf'
};

//Services
import { DocumentosService } from './detalle/documentos/documentos.service';
import { PagosService } from './detalle/pagos/pagos.service';

//Components
import { ProyectosComponent } from './proyectos.component';
import { DetalleComponent } from './detalle/detalle.component';
import { PagosComponent } from './detalle/pagos/pagos.component';
import { DocumentosComponent } from './detalle/documentos/documentos.component';
import { AgregarDocumentosComponent } from './detalle/documentos/agregar-documentos/agregar-documentos.component';
import { ElementoListaComponent } from './detalle/documentos/agregar-documentos/elemento-lista/elemento-lista.component';
import { BotonDropzoneComponent } from './detalle/documentos/agregar-documentos/boton-dropzone/boton-dropzone.component';
import { EditarDocumentoComponent } from './detalle/documentos/editar-documento/editar-documento.component';
import { AgregarPagoComponent } from './detalle/pagos/agregar-pago/agregar-pago.component';
import { InformacionComponent } from './detalle/informacion/informacion.component';
import { SeleccionarCotizacionComponent } from './crear-proyecto/seleccionar-cotizacion/seleccionar-cotizacion.component';
import { ActividadComponent } from './detalle/actividad/actividad.component';
import { GastosComponent } from './detalle/gastos/gastos.component';
import { NuevoGastoComponent } from './detalle/gastos/nuevo-gasto/nuevo-gasto.component';
import { DropzoneBtnComponent } from './detalle/shared/dropzone-btn/dropzone-btn.component';
import { SubirFacturaComponent } from './detalle/pagos/subir-factura/subir-factura.component';
import { AsignarTrabajadoresComponent } from './detalle/actividad/asignar-trabajadores/asignar-trabajadores.component';
import { ListaTrabajadoresComponent } from './detalle/actividad/lista-trabajadores/lista-trabajadores.component';
import { ActividadService } from './detalle/actividad/actividad.service';
import { CalendarComponent } from './detalle/actividad/calendar/calendar.component'
import { ProyectosService } from './proyectos.service';
import { CardComponent } from './card/card.component';
import { CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component';
import { InstalacionesModalComponent } from './detalle/instalaciones/instalaciones-modal/instalaciones-modal.component';
import { InstalacionesService } from './instalaciones.service';
import { ProyectosNewComponent, SafePipe } from './proyectos-new/proyectos-new.component';
@NgModule({
  declarations: [
    ProyectosComponent,
    DetalleComponent,
    PagosComponent,
    DocumentosComponent,
    AgregarDocumentosComponent,
    AgregarPagoComponent,
    InformacionComponent,
    SeleccionarCotizacionComponent,
    ElementoListaComponent,
    ActividadComponent,
    GastosComponent,
    NuevoGastoComponent,
    DropzoneBtnComponent,
    EditarDocumentoComponent,
    BotonDropzoneComponent,
    SubirFacturaComponent,
    DropzoneBtnComponent,
    AsignarTrabajadoresComponent,
    ListaTrabajadoresComponent,
    CalendarComponent,
    CardComponent,
    CrearProyectoComponent,
    InstalacionesModalComponent,
    ProyectosNewComponent,
    SafePipe,
  ],
  entryComponents: [
    SeleccionarCotizacionComponent,
    NuevoGastoComponent,
    EditarDocumentoComponent,
    AgregarPagoComponent,
    SubirFacturaComponent,
    AsignarTrabajadoresComponent,
    AgregarDocumentosComponent,
    CrearProyectoComponent,
    InstalacionesModalComponent
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProyectosRoutingModule,
    SharedModule,
    DropzoneModule,
  ],

  providers: [
    ProyectosService,
    InstalacionesService,
    DocumentosService,
    PagosService,
    ActividadService,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class ProyectosModule { }
