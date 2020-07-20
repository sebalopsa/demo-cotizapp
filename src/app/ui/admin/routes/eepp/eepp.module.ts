import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2Rut } from 'ng2-rut';
import { SharedModule } from '../shared/shared.module'
import { EeppRoutingModule } from './eepp-routing.module';

//Components
import { EeppComponent } from './eepp.component';
//Eepp Component
import { InicioComponent } from './inicio/inicio.component';
import { NuevoEpComponent } from './nuevo-ep/nuevo-ep.component';
//Inicio Component
import { VistaGeneralSectionComponent } from './inicio/vista-general-section/vista-general-section.component';
import { EeppSectionComponent } from './inicio/eepp-section/eepp-section.component';
//Eepp Section Component
import { TableEeppComponent } from './inicio/eepp-section/table-eepp/table-eepp.component';
//Nuevo Ep Component
import { FormEmpresaComponent } from './nuevo-ep/form-empresa/form-empresa.component';
import { FormFechaComponent } from './nuevo-ep/form-fecha/form-fecha.component';
import { FormClienteComponent } from './nuevo-ep/form-cliente/form-cliente.component';
import { FormServicioComponent } from './nuevo-ep/form-servicio/form-servicio.component';
import { FormDetalleComponent } from './nuevo-ep/form-detalle/form-detalle.component';
import { FormNotasComponent } from './nuevo-ep/form-notas/form-notas.component';
import { FormTotalesComponent } from './nuevo-ep/form-totales/form-totales.component';



@NgModule({
  declarations: [
    EeppComponent,

    InicioComponent, 
    NuevoEpComponent,

    VistaGeneralSectionComponent, 
    EeppSectionComponent,

    TableEeppComponent, 

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
    EeppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    Ng2Rut,
    SharedModule
  ]
})
export class EeppModule { }
