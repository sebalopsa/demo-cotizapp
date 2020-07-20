import { Component, OnChanges, Input } from '@angular/core';
import { Trabajador } from 'src/app/models';
import { Observable } from 'rxjs';


@Component({
  selector: 'progreso-ficha-trabajador',
  templateUrl: './progreso-ficha-trabajador.component.html',
  styleUrls: ['./progreso-ficha-trabajador.component.css']
})
export class ProgresoFichaTrabajadorComponent implements OnChanges {

  @Input() trabajador: Trabajador;
  progreso: number;
  progresoString: String;

  constructor() { }

  ngOnChanges() {
    if (this.trabajador) {
      this.progreso = this.contarCampos()
      this.progresoString = this.progreso.toString() + "%";
    }
  }

  contarCampos() {
    let total = []
    let llenados = []
    Object.keys(this.requiredModel).map(key => {
      let childs = Object.keys(this.requiredModel[key]).map(childKey => {
        if (this.trabajador[key] && this.trabajador[key][childKey] && this.trabajador[key][childKey] != (null || ""))
          llenados.push(key + '-' + childKey)
        total.push(key + '-' + childKey)
      })
      if (childs.length == 0) {
        if (this.trabajador[key] && this.trabajador[key] != (null || ""))
          llenados.push(key)
        total.push(key)
      }
    })
    return Math.trunc(llenados.length / total.length * 100)
  }

  requiredModel = {
    rut: true,
    nombre: true,
    apellidos: true,
    nacimiento: true,
    direccion: true,
    telefono: true,
    email: true,
    cuenta: {
      banco: true,
      tipo: true,
      numero: true
    },
    previsionSocial: true,
    previsionSalud: true,
    cargo: true,
    empleador: true,
    tipoContrato: true,
    fechaIngreso: true,
    medidasEpp: {
      zapato: true,
      overol: true,
      geologo: true,
      polera: true,
      chaqueta: true
    },
    fotoUrl: true,
  }
}




