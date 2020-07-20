import { Component, OnInit } from '@angular/core';
import { ProyectosService, Proyecto } from './proyectos.service';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component';
@Component({
  selector: 'proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {
  proyectos$: Observable<Proyecto[]>;
  filter;
  search: boolean;

  constructor(
    private proyectosSrv: ProyectosService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.proyectos$ = this.proyectosSrv.getItems();
  }

  toggleSearch() {
    this.search = !this.search;
  }

  nuevoProyecto() {
    const modalRef = this.modalService.open(CrearProyectoComponent, { centered: true, backdrop: 'static' });
  }

}
