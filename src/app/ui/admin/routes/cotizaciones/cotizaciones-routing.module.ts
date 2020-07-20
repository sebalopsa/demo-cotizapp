import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CotizacionesComponent } from './cotizaciones.component';
import { InicioComponent } from './inicio/inicio.component';
import { NuevaCotizacionComponent } from './nueva-cotizacion/nueva-cotizacion.component';

const routes: Routes = [
  {
    path: '', component: CotizacionesComponent, children: [
      { path: '', component: InicioComponent },
      { path: 'nueva', component: NuevaCotizacionComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotizacionesRoutingModule { }
