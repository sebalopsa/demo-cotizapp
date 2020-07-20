import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AsignarTrabajadoresService } from './asignar-trabajadores.service';
import { Router } from '@angular/router';
@Component({
  selector: 'asignar-trabajadores',
  templateUrl: './asignar-trabajadores.component.html',
  styleUrls: ['./asignar-trabajadores.component.css'],
  providers: [AsignarTrabajadoresService]
})
export class AsignarTrabajadoresComponent implements OnInit {

  tipoTrabajo: number

  constructor(
    private activeModal: NgbActiveModal,
    public srv: AsignarTrabajadoresService,
    public calendar: NgbCalendar,
    private router: Router,
  ) { }

  ngOnInit() {
    this.srv.tipoTrabajo = this.tipoTrabajo
  }

  seleccionar(indice: number) {
    this.srv.seleccionar(indice)
  }

  verFicha(rut) {
    this.activeModal.close()
    this.router.navigateByUrl('/trabajadores/lista/' + rut)
  }

  registrar(){
    this.srv.registrar()
    this.cerrar()
  }
  
  cerrar() {
    this.activeModal.close()
  }

  limpiar() {
    this.srv.limpiarBBDD()
  }

  getNow(){
    return Date.now()
  }
  
}
