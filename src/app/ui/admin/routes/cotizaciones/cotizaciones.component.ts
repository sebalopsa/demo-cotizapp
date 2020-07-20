import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CotizacionesFacadeService } from 'src/app/store/cotizaciones/facade';
import { Observable } from 'rxjs';
import { ClientesFacadeService } from 'src/app/store/clientes/facade';

@Component({
  selector: 'cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})
export class CotizacionesComponent implements OnInit {
  loading$: Observable<boolean>
  constructor(
    private cotFacadeSrv: CotizacionesFacadeService,
    private cd: ChangeDetectorRef
  ) {
   }

  ngOnInit() {
    this.loading$ = this.cotFacadeSrv.loading$;
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

}
