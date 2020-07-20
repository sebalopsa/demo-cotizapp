import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../proyecto.service';
import { Proyecto } from '../../proyectos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrearProyectoComponent } from '../../crear-proyecto/crear-proyecto.component';

@Component({
  selector: 'informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
  proyecto: Proyecto;

  constructor(
    private srv: ProyectoService,
    private modalSrv: NgbModal
  ) {
    srv.proyecto$.subscribe(p => this.proyecto = p)
  }

  ngOnInit() {
  }


  openInfoEdit() {
    const modalRef = this.modalSrv.open(CrearProyectoComponent, { backdrop: 'static', centered: true });
    modalRef.componentInstance.proyecto = this.proyecto;
  }

}
