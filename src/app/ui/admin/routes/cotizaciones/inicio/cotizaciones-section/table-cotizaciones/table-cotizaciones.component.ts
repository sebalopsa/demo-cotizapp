import { Component, OnInit, Input } from '@angular/core';
import { Cotizacion } from 'src/app/models';
import { CotizacionesFacadeService } from 'src/app/store/cotizaciones/facade';
import { collapseAnimation, collapseOnLeaveAnimation } from 'angular-animations';
import { UiFacadeService } from 'src/app/store/ui/facade';
import { Router } from '@angular/router';

@Component({
  selector: 'table-cotizaciones',
  templateUrl: './table-cotizaciones.component.html',
  styleUrls: ['./table-cotizaciones.component.css'],
  animations: [
    collapseAnimation(),
    collapseOnLeaveAnimation()
  ]
})
export class TableCotizacionesComponent implements OnInit {
  @Input() cotizaciones: Cotizacion[];

  constructor(private cotFacadeSrv: CotizacionesFacadeService,  private router: Router) { }

  ngOnInit() {
  }

  clonar(cotizacion) {
    this.cotFacadeSrv.initializeDraftFromPrevious(cotizacion)
  }

  verPdf(cot) {
    cot.url ? window.open(cot.url, '_blank') :
    this.cotFacadeSrv.makePdfAndShow(cot)
  }

  cambiarEstado(id, nuevoEstado) {
    this.cotFacadeSrv.updateFirestoreDocument(id, { estado: nuevoEstado })
  }

  crearProyecto(cotizacion){
    this.cotFacadeSrv.seleccionarCotizacion(cotizacion);
    this.router.navigateByUrl('/proyectos')
  }



}
