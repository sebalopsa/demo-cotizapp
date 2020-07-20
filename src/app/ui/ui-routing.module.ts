import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', canActivate: [AuthGuard], loadChildren: './admin/admin.module#AdminModule' },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class UiRoutingModule { }
