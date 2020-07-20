import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FichaTrabajadorComponent } from './ficha-trabajador/ficha-trabajador.component';

import { SubirPlanillaComponent } from './subir-planilla/subir-planilla.component';
import { ListaTrabajadoresPageComponent } from './lista-trabajadores-page/lista-trabajadores-page.component';
import { NominasMensualesPageComponent } from './nominas-mensuales-page/nominas-mensuales-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  { path: 'lista', component: ListaTrabajadoresPageComponent },
  { path: 'nominas', component: NominasMensualesPageComponent },
  { path: 'lista/:id', component: FichaTrabajadorComponent },
  { path: 'nominas/subir-nomina', component: SubirPlanillaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrabajadoresRoutingModule { }
