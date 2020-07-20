import { Component, OnInit, Input } from '@angular/core';
import { CotizacionesFacadeService } from 'src/app/store/cotizaciones/facade';
import { Cotizacion } from 'src/app/models';

@Component({
  selector: 'form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit {
  @Input() cotizacion: Cotizacion;

  constructor(private cotsFacadeSrv: CotizacionesFacadeService) { }

  ngOnInit() {
  }

  openSelectClienteModal() {
    this.cotsFacadeSrv.openClienteSelector()
  }
}
