import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectoService } from './proyecto.service';
import { DeleteConfirmComponent } from '../../shared/delete-confirm/delete-confirm.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from '../proyectos.service';

@Component({
  selector: 'detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  providers: [ProyectoService]
})
export class DetalleComponent implements OnInit {

  proyecto: Proyecto;
  estados = ['en espera', 'en curso', 'finalizado', 'cancelado']
  colores = ['secondary', 'info', 'success', 'danger']

  colorOf = (estado) => this.colores[this.estados.indexOf(estado)]

  constructor(
    private srv: ProyectoService,
    private router: Router,
    private modalSrv: NgbModal
  ) { }

  ngOnInit() {
    this.srv.proyecto$.subscribe(p => {
      if (p) {
        this.proyecto = p
      }
    })
  }

  back() {
    this.router.navigateByUrl('/proyectos/old');
  }

  cambiarEstado(nuevoEstado) {
    this.srv.update({ estado: nuevoEstado })
  }

  editarNombre(nuevoNombre) {
    this.srv.update({ nombre: nuevoNombre })
  }

  finalizar() {

  }
  cancelar() {

  }
  openEliminarConfirm() {
    const modalRef = this.modalSrv.open(DeleteConfirmComponent, { size: 'sm', centered: true });
    modalRef.componentInstance.mensaje = "¿Esta seguro que desea eliminar este proyecto?";
    modalRef.componentInstance.clickConfirm.subscribe(() => this.eliminar())
  }

  eliminar() {
    this.srv.delete()
    this.back()
  }

}


