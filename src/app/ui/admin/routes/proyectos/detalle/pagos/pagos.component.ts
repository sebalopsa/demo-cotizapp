import { Component, OnInit, Input } from '@angular/core';
import { Proyecto } from 'src/app/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarPagoComponent } from './agregar-pago/agregar-pago.component';
import { SubirFacturaComponent } from './subir-factura/subir-factura.component';

@Component({
  selector: 'pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  @Input() proyecto: Proyecto;
  mostrarGrafico: boolean;
  docEP: any[];
  docFactura: any[];

  documentosSubidos: {
    estadoPago: null,
    factura: null
  }[]

  constructor(
    private ngbModal: NgbModal,
  ) { }

  ngOnInit() {
  }

  toggleChart() {
    this.mostrarGrafico = !this.mostrarGrafico
  }

  agregarPagoModal() {
    let modalRef = this.ngbModal.open(AgregarPagoComponent, { size: 'lg', backdrop: 'static', scrollable: true })
    modalRef.componentInstance.proyecto = this.proyecto;
  }

  subirFacturaModal(pagoIndex) {
    let modalRef = this.ngbModal.open(SubirFacturaComponent);
    modalRef.componentInstance.proyecto = this.proyecto
    modalRef.componentInstance.pagoIndex = pagoIndex
  }

  verFactura(factura) {
    window.open(factura.url)
  }

}
