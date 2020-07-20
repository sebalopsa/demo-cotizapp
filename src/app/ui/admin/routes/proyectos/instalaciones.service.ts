import { Injectable } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable()

export class InstalacionesService {

  instalacionesCollection: AngularFirestoreCollection<Instalacion>
  firestoreSubscription: Subscription

  private _instalaciones = new BehaviorSubject<Instalacion[]>([])
  readonly instalaciones$ = this._instalaciones.asObservable()

  get instalaciones() {
    return this._instalaciones.getValue()
  }
  set instalaciones(val) {
    this._instalaciones.next(val)
  }

  constructor(
    private db: AngularFirestore,
  ) {
    this.instalacionesCollection = db.collection<Instalacion>('instalaciones')
  }



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

  // getItems(material, proyectoId?) {
  //   if (!this.firestoreSubscription) {
  //     this.subscribeToFirestoreCollection()
  //   }
  //   return this.instalaciones$.pipe(map(
  //     values => values
  //       .filter(inst => inst.proyecto === (proyectoId ? proyectoId : this.proyectoId) && inst.material === material)
  //       .sort((a, b) => (a.timestamp - b.timestamp))
  //   ))
  // }

  // create(item) {
  //   let value = { ...item, timestamp: Date.now() }
  //   return this.instalacionesCollection.add(value)
  // }

  // edit(id, item) {
  //   return this.instalacionesCollection.doc(id).update(item)
  // }

  // remove(id) {
  //   return this.instalacionesCollection.doc(id).delete()
  // }
}

export interface Instalacion {
  fechaInicio: number,
  fechaTermino: number,
  material: string,
  tipo: string,
  cantidad: number,
  proyecto: string,
  timestamp: number,
}