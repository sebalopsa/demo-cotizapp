import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module'

import { TrabajadoresRoutingModule } from './trabajadores-routing.module';
import { FichaTrabajadorComponent } from './ficha-trabajador/ficha-trabajador.component';
import { TrabajadoresComponent } from './trabajadores.component';
import { TrabajadorCardComponent } from './lista-trabajadores-page/lista-trabajadores/trabajador-card/trabajador-card.component';
import { NuevoTrabajadorCardComponent } from './lista-trabajadores-page/lista-trabajadores/nuevo-trabajador-card/nuevo-trabajador-card.component';

import { SubirPlanillaComponent } from './subir-planilla/subir-planilla.component';
import { FichaTrabajadorHeaderComponent } from './ficha-trabajador/ficha-trabajador-header/ficha-trabajador-header.component';
import { FichaTrabajadorDatosComponent } from './ficha-trabajador/ficha-trabajador-datos/ficha-trabajador-datos.component';
import { DatosPersonalesComponent } from './ficha-trabajador/ficha-trabajador-datos/datos-personales/datos-personales.component';
import { DatosMedidasEppComponent } from './ficha-trabajador/ficha-trabajador-datos/datos-medidas-epp/datos-medidas-epp.component';
import { DatosLaboralesComponent } from './ficha-trabajador/ficha-trabajador-datos/datos-laborales/datos-laborales.component';
import { DatosLeyesSocialesComponent } from './ficha-trabajador/ficha-trabajador-datos/datos-leyes-sociales/datos-leyes-sociales.component';
import { DatosCuentaBancariaComponent } from './ficha-trabajador/ficha-trabajador-datos/datos-cuenta-bancaria/datos-cuenta-bancaria.component';
import { ListaTrabajadoresPageComponent } from './lista-trabajadores-page/lista-trabajadores-page.component';
import { ResumenTrabajadoresComponent } from './lista-trabajadores-page/resumen-trabajadores/resumen-trabajadores.component';
import { ListaTrabajadoresComponent } from './lista-trabajadores-page/lista-trabajadores/lista-trabajadores.component';
import { NuevoTrabajadorModalComponent } from './lista-trabajadores-page/nuevo-trabajador-modal/nuevo-trabajador-modal.component';
import { ProgresoFichaTrabajadorComponent } from './ficha-trabajador/progreso-ficha-trabajador/progreso-ficha-trabajador.component';

import { NominasMensualesPageComponent } from './nominas-mensuales-page/nominas-mensuales-page.component';
import { ResumenNominasComponent } from './nominas-mensuales-page/resumen-nominas/resumen-nominas.component';
import { ListaNominasComponent } from './nominas-mensuales-page/lista-nominas/lista-nominas.component';
import { DocumentosCardComponent } from './ficha-trabajador/documentos-card/documentos-card.component';
import { EditarDocumentoComponent } from './ficha-trabajador/documentos-card/editar-documento/editar-documento.component';
import { AgregarDocumentosComponent } from './ficha-trabajador/documentos-card/agregar-documentos/agregar-documentos.component';
import { ElementoListaComponent } from './ficha-trabajador/documentos-card/agregar-documentos/elemento-lista/elemento-lista.component';
import { DocumentosService } from './ficha-trabajador/documentos-card/documentos.service';

//Módulos fuck de terceros
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { BotonDropzoneComponent } from './ficha-trabajador/documentos-card/agregar-documentos/boton-dropzone/boton-dropzone.component';
import { ListaDocumentosComponent } from './lista-trabajadores-page/resumen-trabajadores/lista-documentos/lista-documentos.component';
import { TrabajadoresService } from './trabajadores.service';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post',
  maxFilesize: 10,
  maxFiles: 5,
  acceptedFiles: 'image/*,application/pdf'
};


@NgModule({
  declarations: [
    FichaTrabajadorComponent,
    TrabajadoresComponent,
    TrabajadorCardComponent,
    NuevoTrabajadorCardComponent,
    SubirPlanillaComponent,
    DocumentosCardComponent,
    EditarDocumentoComponent,
    AgregarDocumentosComponent,
    ElementoListaComponent,
    FichaTrabajadorHeaderComponent,
    FichaTrabajadorDatosComponent,
    DatosPersonalesComponent,
    DatosLaboralesComponent,
    DatosCuentaBancariaComponent,
    DatosLeyesSocialesComponent,
    DatosMedidasEppComponent,
    ListaTrabajadoresPageComponent,
    NominasMensualesPageComponent,
    ResumenTrabajadoresComponent,
    ListaTrabajadoresComponent,
    NuevoTrabajadorModalComponent,
    ResumenNominasComponent,
    ListaNominasComponent,
    ProgresoFichaTrabajadorComponent,
    BotonDropzoneComponent,
    ListaDocumentosComponent
  ],
  entryComponents: [
    AgregarDocumentosComponent,
    EditarDocumentoComponent,
    ListaDocumentosComponent
  ],
  imports: [
    CommonModule,
    TrabajadoresRoutingModule,
    SharedModule,
    NgbModule,
    DropzoneModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class TrabajadoresModule { }
