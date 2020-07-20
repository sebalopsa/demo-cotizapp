import { Component, OnInit, Input } from '@angular/core';
import { Trabajador } from '../../../trabajadores.service';

@Component({
  selector: 'trabajador-card',
  templateUrl: './trabajador-card.component.html',
  styleUrls: ['./trabajador-card.component.css']
})
export class TrabajadorCardComponent implements OnInit {

  @Input() trabajador: Trabajador;

  documentosPorVencer: any[];
  documentosVencidos: any[];

  defaultImg = '../../../../../../../../assets/img/worker-1.png'
  constructor() {
  }

  ngOnInit() {
    this.buscarDocumentosPorVencer()
  }

  buscarDocumentosPorVencer() {
    if (this.trabajador.documentos) {
      this.documentosPorVencer = []
      this.documentosVencidos = []
      this.trabajador.documentos.filter(doc => doc.vencimiento.fechaEpoch).map(doc => {
        let hoy = new Date().setUTCHours(12, 0, 0, 0)
        let diasRestantes = (doc.vencimiento.fechaEpoch - hoy) / (24 * 3600 * 1000)
        if (diasRestantes <= 0) {
          this.documentosVencidos.push({ nombre: doc.nombre, dias: -diasRestantes })
        }
        else if (diasRestantes <= 30) {
          this.documentosPorVencer.push({ nombre: doc.nombre, dias: diasRestantes })
        }
      })
    }
  }
}
