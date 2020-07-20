import { Component, OnInit, Input, Injector } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InstalacionesService } from './instalaciones.service';
import * as _ from 'lodash';
import { InstalacionesModalComponent } from './instalaciones-modal/instalaciones-modal.component';

import informacion_tecnica from 'src/assets/files/informacion_tecnica.json'

@Component({
  selector: 'instalaciones',
  templateUrl: './instalaciones.component.html',
  styleUrls: ['./instalaciones.component.css'],
  providers: [InstalacionesService]
})
export class InstalacionesComponent implements OnInit {

  @Input() material: string
  total
  ultimaEdicion: string
  unidad: string

  constructor(
    private srv: InstalacionesService,
    private modalSrv: NgbModal,
  ) { }

  ngOnInit() {
    this.srv.getItems(this.material).subscribe(items => {
      this.total = this.getTotal(items)
      this.ultimaEdicion = this.getUltimaEdicion(items)
    })
    this.unidad = this.getUnidad()
  }


  open() {
    let ref = this.modalSrv.open(InstalacionesModalComponent, { scrollable: true, size: 'lg' })
    ref.componentInstance.materialInfo = informacion_tecnica.find(item => item.nombre === this.material)
    ref.componentInstance.proyecto = this.srv.proyecto
  }

  getTotal(items) {
    return items.reduce((suma, item) => {
      return (suma + item.cantidad)
    }, 0)
  }

  getUnidad() {
    return informacion_tecnica.find(item => item.nombre === this.material).unidad
  }

  getUltimaEdicion(items) {
    let value = items.length ? _.last(items)["timestamp"] : null
    if (!value) return 'sin registros'
    let diferencia = (new Date().getTime() - value) / 1000
    if (diferencia < 120)
      return 'hace unos segundos'
    else if (diferencia < 3600)
      return 'hace unos minutos'
    else if (diferencia < 7200)
      return 'hace una hora'
    else if (diferencia < 86400)
      return 'hace unas horas'
    else if (diferencia < 172800)
      return 'hace un dia'
    else if (diferencia < 604800)
      return 'hace unos dias'
    else if (diferencia < 1209600)
      return 'hace una semana'
    else if (diferencia < 2592000)
      return 'hace unas semanas'
    return 'hace unos meses'
  }

}
