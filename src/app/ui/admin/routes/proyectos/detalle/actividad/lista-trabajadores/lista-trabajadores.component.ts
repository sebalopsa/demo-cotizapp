import { Component, Input, OnInit } from '@angular/core';
import { ActividadService, Jornada } from '../actividad.service';
import { Trabajador } from 'src/app/models';
import * as _ from 'lodash';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista-trabajadores',
  templateUrl: './lista-trabajadores.component.html',
  styleUrls: ['./lista-trabajadores.component.scss']
})
export class ListaTrabajadoresComponent implements OnInit {

  trabajadores: Trabajador[]
  filter;

  constructor(
    public srv: ActividadService,
    private router: Router
  ) { }

  ngOnInit() {
    this.srv.getListaTrabajadoresByDate().subscribe(t => {
      this.trabajadores = _.sortBy(t, ['apellidos', 'nombres'])
    })
  }

  verFicha(rut) {
    this.router.navigateByUrl('/trabajadores/lista/' + rut)
  }
}
