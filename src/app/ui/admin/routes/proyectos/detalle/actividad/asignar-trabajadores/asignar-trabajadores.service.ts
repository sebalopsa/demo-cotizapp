import { Injectable } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ActividadService } from '../actividad.service';
import * as _ from 'lodash';
import { map, merge } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()

export class AsignarTrabajadoresService {

  fechaInicio: number
  fechaTermino: number
  tipoTrabajo: number // 1: E + S, 2: E, 3: S
  loading: boolean = true
  trabajadoresCargados: boolean = false
  disponibles: any[]
  trabajadores
  movimientos

  constructor(
    private actividadSrv: ActividadService,
    private fs: AngularFirestore,

  ) {
    this.actividadSrv.getTrabajadores().subscribe(t => {
      this.trabajadores = t
    })
    this.actividadSrv.getMovimientos().subscribe(m => {
      this.movimientos = m
      console.log(m)
    })
  }

  cargarTrabajadores() {
    let trabajadores
    this.actividadSrv.getHistorialTrabajadores().subscribe(historial => {
      console.log(historial)
      switch (this.tipoTrabajo) {
        case 1:
          trabajadores = historial.filter(h => (h.movimientos.length === 0 ||
            (!(h.movimientos.find(m => (m.fecha >= this.fechaInicio && m.fecha <= this.fechaTermino))) && (h.movimientos.find(m => m.fecha < this.fechaInicio) ? _.last(h.movimientos.filter(m => m.fecha < this.fechaInicio)).tipo === 'salida' : true))))
            .map(t => { return { ...t.trabajador, seleccionado: false } })
          break
        case 2:
          trabajadores = historial.filter(h => (
            h.movimientos.length === 0 || (_.last(h.movimientos).fecha < this.fechaInicio
              && _.last(h.movimientos).tipo === ('salida'))))
            .map(t => { return { ...t.trabajador, seleccionado: false } })
          break
        case 3:
          trabajadores = historial.filter(h => (
            h.movimientos.length !== 0 && _.last(h.movimientos).fecha <= this.fechaTermino
            && _.last(h.movimientos).tipo === ('entrada')))
            .map(t => { return { ...t.trabajador, seleccionado: false } })
          break
      }
      this.disponibles = _.sortBy(trabajadores, ['apellidos', 'nombres'])
      this.trabajadoresCargados = true
    })
  }

  fechaRegistrada(): boolean {
    if ((this.tipoTrabajo === 1 && this.fechaInicio && this.fechaTermino && (this.fechaInicio <= this.fechaTermino)) || (this.tipoTrabajo === 2 && this.fechaInicio) || (this.tipoTrabajo === 3 && this.fechaTermino))
      return true
    else return false
  }

  resetearFecha() {
    if (this.ifSeleccionados()) {
      this.disponibles.filter(t => t.seleccionado).forEach((t, i) => this.seleccionar(i))
    }
    this.trabajadoresCargados = false
    this.fechaInicio = null
    this.fechaTermino = null
  }

  seleccionar(i: number) {
    this.disponibles[i].seleccionado = !this.disponibles[i].seleccionado
  }

  ifSeleccionados() {
    if (this.disponibles)
      return this.disponibles.find(t => t.seleccionado)
  }

  registrar() {
    let trabsMovidos = this.disponibles.filter(t => t.seleccionado).map(t => t.rut)
    switch (this.tipoTrabajo) {
      case 1:
        this.actividadSrv.createMovimiento('entrada', trabsMovidos, this.fechaInicio).
          then(() =>
            this.actividadSrv.createMovimiento('salida', trabsMovidos, this.fechaTermino)
          )
        break
      case 2:
        this.actividadSrv.createMovimiento('entrada', trabsMovidos, this.fechaInicio)
        break
      case 3:
        this.actividadSrv.createMovimiento('salida', trabsMovidos, this.fechaTermino)
        break
    }
  }

  limpiarBBDD() {
    this.movimientos.forEach(m => {
      this.fs.collection('movimientos').doc(m.id).delete()
    })
  }

}
