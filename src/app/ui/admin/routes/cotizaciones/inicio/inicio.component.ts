import { Component, OnInit } from '@angular/core';
import { CotizacionesFacadeService } from 'src/app/store/cotizaciones/facade';
import { Observable } from 'rxjs';
import { Cotizacion } from 'src/app/models';
@Component({
  selector: 'inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  count$: Observable<number>;
  cotizaciones$: Observable<Cotizacion>;
  loading: boolean;

  constructor(private cotFacadeSrv: CotizacionesFacadeService) { }

  ngOnInit() {
    this.count$ = this.cotFacadeSrv.count$;
    this.cotizaciones$ = this.cotFacadeSrv.cotizaciones$;
    this.cotFacadeSrv.loadItems();
    this.cotFacadeSrv.nuevaCotizacion$.subscribe((object: any) =>
      this.loading = object ? object.isLoading : false
    )
  }

  nuevaCotizacion() {
    this.cotFacadeSrv.initializeBlankDraft();
  }

}
