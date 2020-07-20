import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2Rut } from 'ng2-rut';
import { SharedModule } from '../shared/shared.module'
import { OoccRoutingModule } from './oocc-routing.module';
//Components
import { OoccComponent } from './oocc.component';
//Oocc Component
import { InicioComponent } from './inicio/inicio.component';
import { NuevaOcComponent } from './nueva-oc/nueva-oc.component';
//Inicio Component
import { VistaGeneralSectionComponent } from './inicio/vista-general-section/vista-general-section.component';
import { OoccSectionComponent } from './inicio/oocc-section/oocc-section.component';
//Oocc Section Component
import { TableOoccComponent } from './inicio/oocc-section/table-oocc/table-oocc.component';
//Nueva Oc Component
import { FormEmpresaComponent } from './nueva-oc/form-empresa/form-empresa.component';
import { FormFechaComponent } from './nueva-oc/form-fecha/form-fecha.component';
import { FormClienteComponent } from './nueva-oc/form-cliente/form-cliente.component';
import { FormServicioComponent } from './nueva-oc/form-servicio/form-servicio.component';
import { FormDetalleComponent } from './nueva-oc/form-detalle/form-detalle.component';
import { FormNotasComponent } from './nueva-oc/form-notas/form-notas.component';
import { FormTotalesComponent } from './nueva-oc/form-totales/form-totales.component';


@NgModule({
  declarations: [
    OoccComponent,

    InicioComponent,
    NuevaOcComponent,

    VistaGeneralSectionComponent,
    OoccSectionComponent,

    TableOoccComponent,

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
    OoccRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    Ng2Rut,
    SharedModule
  ]
})
export class OoccModule { }
