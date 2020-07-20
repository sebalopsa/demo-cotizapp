import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadRoutingModule } from './actividad-routing.module';
import { ActividadComponent } from './actividad.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ActividadComponent],
  imports: [
    CommonModule,
    ActividadRoutingModule,
    SharedModule
  ]
})
export class ActividadModule { }
