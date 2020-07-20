import { Component, OnInit } from '@angular/core';
import { NominaMensual } from 'src/app/models';
import { Observable } from 'rxjs';
import { NominasFacadeService } from 'src/app/store/nominas/facade';

@Component({
  selector: 'app-nominas-mensuales-page',
  templateUrl: './nominas-mensuales-page.component.html',
  styleUrls: ['./nominas-mensuales-page.component.css']
})
export class NominasMensualesPageComponent implements OnInit {
  nominas$: Observable<NominaMensual[]>
  hasLoaded: boolean;
  constructor(private nominasFacadeSrv: NominasFacadeService) { }

  ngOnInit() {
    this.nominas$ = this.nominasFacadeSrv.nominas$
    this.nominasFacadeSrv.hasLoaded$.subscribe(val => this.hasLoaded = val)
    if (!this.hasLoaded)
      this.nominasFacadeSrv.load();
  }

}
