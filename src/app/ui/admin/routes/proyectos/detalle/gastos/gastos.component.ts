import { Component, OnInit, Input } from '@angular/core';
import { Proyecto } from 'src/app/models';
import { NuevoGastoComponent } from './nuevo-gasto/nuevo-gasto.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GastosService } from './gastos.service';

@Component({
  selector: 'gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
  providers: [GastosService]
})
export class GastosComponent implements OnInit {

  @Input() proyecto: Proyecto

  constructor(
    private modalSrv: NgbModal,
    private srv: GastosService
  ) { }

  ngOnInit() {
  }

  nuevoGasto() {
    let modalRef = this.modalSrv.open(NuevoGastoComponent, {backdrop: 'static' ,centered: true});
    modalRef.componentInstance.proyecto = this.proyecto;






  }

  eliminar(index, url) {
    this.srv.borrarGasto(this.proyecto, index, url)
  }

  descargar(url){
    url ? window.open(url, '_blank') : false;
  }


}
