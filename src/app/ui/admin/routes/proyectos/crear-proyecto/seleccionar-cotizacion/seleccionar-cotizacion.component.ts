import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Cotizacion } from 'src/app/models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SeleccionarCotizacionService } from './seleccionar-cotizacion.service';
@Component({
  selector: 'seleccionar-cotizacion',
  templateUrl: './seleccionar-cotizacion.component.html',
  styleUrls: ['./seleccionar-cotizacion.component.scss'],
  providers: [SeleccionarCotizacionService]
})
export class SeleccionarCotizacionComponent implements OnInit {

  filter;
  cotizaciones$: Observable<Cotizacion[]>
  @Output() select = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private srv: SeleccionarCotizacionService) { }

  ngOnInit() {
    this.cotizaciones$ = this.srv.getCotizaciones();
  }

  seleccionar(cotizacion) {
    this.select.emit(cotizacion);
    this.close();
  }

  close() {
    this.activeModal.close();
  }

}



