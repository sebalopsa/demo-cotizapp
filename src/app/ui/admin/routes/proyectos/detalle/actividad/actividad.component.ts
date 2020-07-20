import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Proyecto } from 'src/app/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AsignarTrabajadoresComponent } from './asignar-trabajadores/asignar-trabajadores.component'
import { ActividadService } from './actividad.service';

@Component({
  selector: 'actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit, OnChanges {

  @Input() proyecto: Proyecto

  constructor(
    private ngbModal: NgbModal,
    public srv: ActividadService
  ) { }

  ngOnInit() { 
    this.srv.proyecto = this.proyecto
    this.srv.getTrabajadores().subscribe(t => {
      this.srv.trabajadores = t
    })
    this.srv.getMovimientos().subscribe(m => {
      this.srv.movimientos = m
    })
    this.srv.getJornadas().subscribe(j => {
      this.srv.jornadas = j
    })
  }

  ngOnChanges(){
    this.srv.proyecto = this.proyecto
  }

  asignarTrabajadoresModal(tipo: number) {
    let modalRef = this.ngbModal.open(AsignarTrabajadoresComponent, { backdrop: 'static', size:'lg', scrollable: true });
    modalRef.componentInstance.proyecto = this.proyecto
    modalRef.componentInstance.tipoTrabajo = tipo
  }

  open(content) {
    this.ngbModal.open(content, {centered: true})
  }

}
