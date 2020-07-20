import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { EstadoPago, Proyecto } from 'src/app/models';
import { EeppFacadeService } from 'src/app/store/eepp/facade';
import { PagosService } from '../pagos.service';

@Component({
  selector: 'agregar-pago',
  templateUrl: './agregar-pago.component.html',
  styleUrls: ['./agregar-pago.component.css']
})
export class AgregarPagoComponent implements OnInit {
  proyecto: Proyecto
  loading$: Observable<boolean>
  documentos$: Observable<EstadoPago>
  hasLoaded: boolean
  filter

  constructor(
    public activeModal: NgbActiveModal,
    private eeppFacadeSrv: EeppFacadeService,
    private srv: PagosService,
    private modalSrv: NgbModal
  ) { }

  ngOnInit() {
    this.loading$ = this.eeppFacadeSrv.loading$;
    this.eeppFacadeSrv.hasLoaded$.subscribe(val => this.hasLoaded = val)
    if (!this.hasLoaded)
      this.eeppFacadeSrv.loadItems();
    this.documentos$ = this.eeppFacadeSrv.eepp$;
  }

  seleccionar(doc) {
    this.srv.agregarPago(this.proyecto, doc);
    this.activeModal.close();
  }

  cerrar() {
    this.activeModal.close();
  }

  confirmarModal(confirmacion) {
    let modalRef = this.modalSrv.open(confirmacion, { backdrop: false, centered: true });
  }

}
