import { Injectable } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { ProyectoService } from '../proyecto.service';
import { Proyecto } from '../../proyectos.service';

@Injectable()

export class InstalacionesService {

  proyecto: Proyecto

  constructor(
    private db: AngularFirestore,
    private proySrv: ProyectoService
  ) {
    this.instalacionesCollection = db.collection<Instalacion>('instalaciones')
    if (this.proySrv.proyecto$)
      this.proySrv.proyecto$.subscribe(p => {
        if (p) {
          this.proyecto = p
        }
      })
  }

  instalacionesCollection: AngularFirestoreCollection<Instalacion>
  firestoreSubscription: Subscription

  subscribeToFirestoreCollection() {
    this.firestoreSubscription = this.instalacionesCollection.snapshotChanges().pipe(
      map(action => action.map(
        a => {
          const id = a.payload.doc.id
          const item = a.payload.doc.data() as Instalacion
          return { id, ...item }
        }
      ))
    ).subscribe(items => this.instalaciones = items)
  }

  getItems(material, proyectoId?) {
    if (!this.firestoreSubscription) {
      this.subscribeToFirestoreCollection()
    }
    return this.instalaciones$.pipe(map(
      values => values
        .filter(inst => inst.proyecto === (proyectoId ? proyectoId : this.proyecto.id) && inst.material === material)
        .sort((a, b) => (a.timestamp - b.timestamp))
    ))
  }

  getItemsByProyecto(proyectoId) {
    if (!this.firestoreSubscription) {
      this.subscribeToFirestoreCollection()
    }
    return this.instalaciones$.pipe(map(
      values => values
        .filter(inst => inst.proyecto === proyectoId)
        .sort((a, b) => (a.timestamp - b.timestamp))
    ))
  }

  private _instalaciones = new BehaviorSubject<Instalacion[]>([])
  readonly instalaciones$ = this._instalaciones.asObservable()

  get instalaciones() {
    return this._instalaciones.getValue()
  }
  set instalaciones(val) {
    this._instalaciones.next(val)
  }

  create(item) {
    let value = { ...item, timestamp: Date.now() }
    return this.instalacionesCollection.add(value)
  }

  edit(id, item) {
    return this.instalacionesCollection.doc(id).update(item)
  }

  remove(id) {
    return this.instalacionesCollection.doc(id).delete()
  }
}

export interface Instalacion {
  fechaInicio: number,
  fechaTermino: number,
  material: string,
  tipo: string,
  cantidad: number,
  proyecto: string,
  timestamp: number,
  id: string
}