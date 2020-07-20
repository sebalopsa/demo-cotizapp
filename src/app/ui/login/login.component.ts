import { Component, OnInit } from '@angular/core';
import { AuthFacadeService } from 'src/app/store/auth/facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = {
    type: null,
    rememberMe: false,
    userName: null,
    password: null
  }

  error$: Observable<string>;
  loading: boolean;
  showNotification: boolean;
  errorMessage = "Email o contraseña incorrectos."
  constructor(private authFacadeSrv: AuthFacadeService) { }

  ngOnInit() {
    this.error$ = this.authFacadeSrv.error$
    this.authFacadeSrv.isLoading$.subscribe(loading=>this.loading = loading)
    this.error$.subscribe(error => error ? this.showNotification = true : this.showNotification = false)
  }

  login() {
    this.authFacadeSrv.login(this.form.userName, this.form.password)
  }

  cerrarNotificacion() {
    this.showNotification = false
  }
}
