import { Component, OnInit } from '@angular/core';
import { AuthFacadeService } from './store/auth/facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading$: Observable<boolean>
  constructor(private authFacadeSrv: AuthFacadeService) { }

  ngOnInit() {
    this.loading$ = this.authFacadeSrv.isLoading$
  }
}
