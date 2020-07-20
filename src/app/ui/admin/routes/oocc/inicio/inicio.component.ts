import { Component, OnInit } from '@angular/core';
import { OoccFacadeService } from 'src/app/store/oocc/facade';
import { Observable } from 'rxjs';
import { OrdenCompra } from 'src/app/models';
@Component({
  selector: 'inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  count$: Observable<number>;
  oocc$: Observable<OrdenCompra[]>;
  loading: boolean;

  constructor(private ocFacadeSrv: OoccFacadeService) { }

  ngOnInit() {
    this.count$ = this.ocFacadeSrv.count$;
    this.oocc$ = this.ocFacadeSrv.oocc$;
    this.ocFacadeSrv.loadItems();
    this.ocFacadeSrv.nuevaOrdenCompra$.subscribe((object: any) =>
      this.loading = object ? object.isLoading : false
    )
  }

  nuevaOc() {
    this.ocFacadeSrv.initializeBlankDraft();
  }

}
