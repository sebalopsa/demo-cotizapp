import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OoccComponent } from './oocc.component';
import { InicioComponent } from './inicio/inicio.component';
import { NuevaOcComponent } from './nueva-oc/nueva-oc.component';

const routes: Routes = [
  {
    path: '', component: OoccComponent, children: [
      { path: '', component: InicioComponent },
      { path: 'nueva', component: NuevaOcComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OoccRoutingModule { }
