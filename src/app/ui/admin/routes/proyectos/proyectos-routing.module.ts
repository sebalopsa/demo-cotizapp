import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProyectosComponent } from './proyectos.component';
import { DetalleComponent } from './detalle/detalle.component';
import { ProyectosNewComponent } from './proyectos-new/proyectos-new.component';

const routes: Routes = [
  // { path: 'old', component: ProyectosComponent },
  { path: '', component: ProyectosNewComponent },
  // { path: 'old/:id', component: DetalleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectosRoutingModule { }
