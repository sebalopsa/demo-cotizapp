import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, filter, mergeMap } from 'rxjs/operators';
import { Movimiento } from 'src/app/models/movimiento';
import { Observable, BehaviorSubject, merge } from 'rxjs';
import { Proyecto, Trabajador } from 'src/app/models';

export interface Jornada {
  fecha: number,
  trabajadores: string[]
}

export interface Historial {
  trabajador: Trabajador // rut
  movimientos: {
    fecha: number,
    proyecto: string, // id
    tipo: string // 'entrada' / 'salida'
  }[]
}

@Injectable()

export class ActividadService {

  proyecto: Proyecto
  movimientosCollection: AngularFirestoreCollection<Movimiento>
  trabajadoresCollection: AngularFirestoreCollection<Trabajador>
  trabajadores: Trabajador[]
  movimientos: Movimiento[]
  jornadas: Jornada[]
  hoy = new Date().setUTCHours(12, 0, 0, 0)

  constructor(
    private fs: AngularFirestore,
  ) {
    this.movimientosCollection = this.fs.collection('movimientos', mov => mov.orderBy('fecha', 'asc'))
    this.trabajadoresCollection = this.fs.collection('trabajadores', trabs => trabs.orderBy('apellidos', 'desc'))
  }

  private readonly _selectedDate = new BehaviorSubject<number>(this.hoy)

  readonly selectedDate$ = this._selectedDate.asObservable()

  get selectedDate(): number {
    return this._selectedDate.getValue()
  }

  set selectedDate(value: number) {
    this._selectedDate.next(value);
  }

  setSelectedDate(date) {
    this.selectedDate = date
  }

  getMovimientos() {
    return this.movimientosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Movimiento
        const id = a.payload.doc.id
        return { id, ...data }
      })))
  }

  getMovimientosByProyecto(): Observable<Movimiento[]> {
    return this.getMovimientos().pipe(
      map(movimientos => {
        return movimientos.filter(m => (
          m.proyecto === this.proyecto.id
        ))
      })
    )
  }

  getMovimientosByFecha(fecha: number) {
    return this.getMovimientos().pipe(
      map(collection => {
        return collection.filter(m => {
          m.fecha === fecha
        })
      })
    )
  }

  getTrabajadores(): Observable<Trabajador[]> {
    return this.trabajadoresCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Trabajador
        const id = a.payload.doc.id
        return { id, ...data }
      })))
  }

  getListaTrabajadoresByDate(): Observable<Trabajador[]> {
    let jornada: Jornada
    return this.selectedDate$.pipe(
      mergeMap(date => this.getJornadas().pipe(map(jornadas => {
        jornada = _.find(jornadas, ['fecha', this.selectedDate])
        if (jornada)
          return this.trabajadores.filter(t => jornada.trabajadores.includes(t.rut))
        else return []
      }
      )))
    )
  }

  getHistorialTrabajadores(): Observable<Historial[]> {
    return this.getTrabajadores().pipe(
      map(trabajadores => trabajadores.map(t => {
        return {
          trabajador: t,
          movimientos: _.sortBy(this.movimientos.filter(m => m.trabajadores.includes(t.rut)).map(m => {
            let { fecha, proyecto, tipo } = m
            return { fecha, proyecto, tipo }
          }), ['fecha', 'tipo'])
        }
      })
      )
    )
  }

  createMovimiento(tipoMovimiento, trabsMovidos, fecha) {
    let movimiento = {
      proyecto: this.proyecto.id,
      fecha: fecha,
      tipo: tipoMovimiento,
      trabajadores: trabsMovidos,
      timestamp: Date.now()
    }
    return this.fs.collection('movimientos').add(movimiento)
  }

  getJornadas(): Observable<Jornada[]> {
    return this.getMovimientosByProyecto().pipe(
      map(movimientos => {
        let jornadas: Jornada[] = []
        let trabajadores = []
        _.sortBy(movimientos, ['fecha','tipo']).forEach((m, i) => {
          if (m.tipo === 'entrada')
            trabajadores = [...trabajadores, ...m.trabajadores]
          else
            trabajadores = trabajadores.filter(t => !m.trabajadores.includes(t))
          let fecha = m.fecha
          if (i < movimientos.length - 1)
            do {
              jornadas.push({ fecha, trabajadores })
              fecha = this.nextDay(fecha)
            } while (fecha <= movimientos[i + 1].fecha)
          else // cuando i == ultimo indice
            do {
              jornadas.push({ fecha, trabajadores })
              fecha = this.nextDay(fecha)
            } while (fecha <= this.hoy)
        })

        // concatenar trabajadores de dias repetidos
        jornadas = _.toArray(_.mapValues(_.groupBy(jornadas, 'fecha'), (fecha, key) => {
          return {
            fecha: parseInt(key), trabajadores: fecha.reduce((trabs, jornada) => {
              return _.union(trabs, jornada.trabajadores)
            }, [])
          }
        }))
        return jornadas
      })
    )
  }

  nextDay(date: number): number {
    const nextObject = new Date(date + 24 * 3600 * 1000)
    const next = new Date(nextObject.getFullYear(), nextObject.getMonth(), nextObject.getDate(), 12)
    return next.getTime()
  }

}


