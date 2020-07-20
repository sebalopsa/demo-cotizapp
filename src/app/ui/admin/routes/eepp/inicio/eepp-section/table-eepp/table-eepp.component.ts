import { Component, OnInit, Input } from '@angular/core';
import { EstadoPago } from 'src/app/models';
import { EeppFacadeService } from 'src/app/store/eepp/facade';
import { collapseAnimation, collapseOnLeaveAnimation } from 'angular-animations';
import { UiFacadeService } from 'src/app/store/ui/facade';

@Component({
  selector: 'table-eepp',
  templateUrl: './table-eepp.component.html',
  styleUrls: ['./table-eepp.component.css'],
  animations: [
    collapseAnimation(),
    collapseOnLeaveAnimation()
  ]
})
export class TableEeppComponent implements OnInit {
  @Input() items: EstadoPago[];

  constructor(private epFacadeSrv: EeppFacadeService, private uiFacadeSrv: UiFacadeService) { }

  ngOnInit() {
  }

  descargar(url) {
    window.open(url, 'download');
  }

  clonar(item) {
    this.epFacadeSrv.initializeDraftFromPrevious(item)
  }

  verPdf(url?) {
    url ? window.open(url, '_blank') : false
  }

  cambiarEstado(id, nuevoEstado) {
    this.epFacadeSrv.updateFirestoreDocument(id, { estado: nuevoEstado })
  }



}
