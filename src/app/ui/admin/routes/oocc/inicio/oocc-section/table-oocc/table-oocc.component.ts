import { Component, OnInit, Input } from '@angular/core';
import { OrdenCompra } from 'src/app/models';
import { OoccFacadeService } from 'src/app/store/oocc/facade';
import { collapseAnimation, collapseOnLeaveAnimation } from 'angular-animations';
import { UiFacadeService } from 'src/app/store/ui/facade';

@Component({
  selector: 'table-oocc',
  templateUrl: './table-oocc.component.html',
  styleUrls: ['./table-oocc.component.css'],
  animations: [
    collapseAnimation(),
    collapseOnLeaveAnimation()
  ]
})
export class TableOoccComponent implements OnInit {
  @Input() items: OrdenCompra[];

  constructor(private ocFacadeSrv: OoccFacadeService, private uiFacadeSrv: UiFacadeService) { }

  ngOnInit() {
  }

  descargar(url) {
    window.open(url, 'download');
  }

  clonar(oc) {
    this.ocFacadeSrv.initializeDraftFromPrevious(oc)
  }

  verPdf(url?) {
    url ? window.open(url, '_blank') : false
  }

  cambiarEstado(id, nuevoEstado) {
    this.ocFacadeSrv.updateFirestoreDocument(id, { estado: nuevoEstado })
  }



}
