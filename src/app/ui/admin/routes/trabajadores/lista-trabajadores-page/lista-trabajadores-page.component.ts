import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Trabajador } from 'src/app/models';
import { TrabajadoresService } from '../trabajadores.service';

@Component({
  selector: 'lista-trabajadores-page',
  templateUrl: './lista-trabajadores-page.component.html',
  styleUrls: ['./lista-trabajadores-page.component.css']
})
export class ListaTrabajadoresPageComponent implements OnInit {
  trabajadores: Trabajador[];
  loading: boolean;

  constructor(
    private router: Router,
    private trabsSrv: TrabajadoresService,

  ) { }

  ngOnInit() {
    this.loadTrabajadores();
  }

  loadTrabajadores() {
    this.loading = true;
    this.trabsSrv.getItems().subscribe(
      ts => {
        this.trabajadores = ts;
        this.loading = false;
      },
      err => {
        alert(err);
        this.loading = false;
      }
    )
  }

  agregarTrabajador() {
    this.router.navigateByUrl('trabajadores/agregar');
  }

  subirPlanilla() {
    this.router.navigateByUrl('trabajadores/subir-planilla')
  }







}
