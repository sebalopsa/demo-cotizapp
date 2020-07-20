import { Component, OnInit } from '@angular/core';
import { EeppFacadeService } from 'src/app/store/eepp/facade';
import { Observable } from 'rxjs';
import { EstadoPago } from 'src/app/models';
@Component({
  selector: 'inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  count$: Observable<number>;
  eepp$: Observable<EstadoPago[]>;
  loading: boolean;

  constructor(private epFacadeSrv: EeppFacadeService) { }

  ngOnInit() {
    this.count$ = this.epFacadeSrv.count$;
    this.eepp$ = this.epFacadeSrv.eepp$;
    this.epFacadeSrv.loadItems();
    this.epFacadeSrv.nuevoEstadoPago$.subscribe((object: any) =>
      this.loading = object ? object.isLoading : false
    )
  }

  nuevoEp() {
    this.epFacadeSrv.initializeBlankDraft();
  }

}
