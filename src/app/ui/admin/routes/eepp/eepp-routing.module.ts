import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EeppComponent } from './eepp.component';
import { InicioComponent } from './inicio/inicio.component';
import { NuevoEpComponent } from './nuevo-ep/nuevo-ep.component';

const routes: Routes = [
  {
    path: '', component: EeppComponent, children: [
      { path: '', component: InicioComponent },
      { path: 'nuevo', component: NuevoEpComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EeppRoutingModule { }
