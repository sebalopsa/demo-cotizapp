import { Component, Input, OnInit } from '@angular/core';
import { CardService } from './card.service';
import { Proyecto } from '../proyectos.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  providers: [CardService]
})
export class CardComponent implements OnInit {
  @Input() proyecto: Proyecto;
  avance
  
  constructor(
    private srv: CardService
  ) { }
  ngOnInit() {
    this.srv.getAvance(this.proyecto.id).subscribe(obj => this.avance = obj)
  }

  color = () => {
    switch (this.proyecto.estado) {
      case 'activo':
        return 'info';
      case 'cancelado':
        return 'danger';
      case 'finalizado':
        return 'success';
      default:
        return 'secondary';
    }
  }

  avanceFinanciero() {
    if (this.proyecto.pagos && this.proyecto.cotizacion.totalNeto) {
      const sumaPagos = this.proyecto.pagos.map(g => g.estadoPago.monto).reduce((a, b) => a = b, 0)
      const montoTotal = this.proyecto.cotizacion.totalNeto + this.proyecto.cotizacion.iva
      return Math.round(sumaPagos / montoTotal * 100)
    }
    return 0
  }

  reloj() {
    const hoy = Date.now()
    if (this.proyecto.inicio && this.proyecto.termino) {
      const inicio = this.proyecto.inicio;
      const termino = this.proyecto.termino;     
      if (hoy > termino)
        return 100
      else
        return Math.round((hoy - inicio) / (termino - inicio) * 100)
    }
    else
      return 0
  }

}
