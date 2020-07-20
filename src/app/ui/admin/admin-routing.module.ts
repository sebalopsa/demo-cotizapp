import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'cotizaciones', pathMatch: 'full' },
      { path: 'cotizaciones', loadChildren: './routes/cotizaciones/cotizaciones.module#CotizacionesModule' },
      // { path: 'eepp', loadChildren: './routes/eepp/eepp.module#EeppModule' },
      // { path: 'oocc', loadChildren: './routes/oocc/oocc.module#OoccModule' },
      // { path: 'trabajadores', loadChildren: './routes/trabajadores/trabajadores.module#TrabajadoresModule' },
      // { path: 'actividad', loadChildren: './routes/actividad/actividad.module#ActividadModule' },
      // { path: 'proyectos', loadChildren: './routes/proyectos/proyectos.module#ProyectosModule' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
