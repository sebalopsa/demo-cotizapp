import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable()
export class ProyectosService {
  proyectosCollection: AngularFirestoreCollection<Proyecto>;
  firestoreSubscription: Subscription;

  private _proyectos = new BehaviorSubject(null);
  readonly proyectos$ = this._proyectos.asObservable();

  get proyectos() {
    return this._proyectos.getValue();
  }
  set proyectos(val) {
    this._proyectos.next(val);
  }

  constructor(
    private db: AngularFirestore
  ) {
    this.proyectosCollection = db.collection<Proyecto>('proyectos', ref => ref.orderBy('timestamp', 'desc'));
  }

  subscribeToFirestoreCollection() {
    this.firestoreSubscription = this.proyectosCollection.snapshotChanges().pipe(
      map(action => action.map(
        a => {
          const id = a.payload.doc.id;
          const item = a.payload.doc.data() as Proyecto;
          return { id, ...item };
        }
      ))
    ).subscribe(items => this.proyectos = items);
  }

  getItems() {
    if (!this.firestoreSubscription) {
      this.subscribeToFirestoreCollection();
    }
    return this.proyectos$;
  }

  create(item) {
    item.timestamp = Date.now();
    item.estado = 'activo';
    return this.proyectosCollection.add(item);
  }

  update(id, data) {
    data.timestamp = Date.now();
    return this.proyectosCollection.doc(id).update(data);
  }
}



export interface Proyecto {
  id?: string;
  timestamp?: number;
  nombre: string;
  descripcion: string;
  inicio?: number;
  termino?: number;
  estado?: string;
  cotizacion: {
    folio: string;
    totalNeto: number;
    iva: number;
    url: string
  },
  pagos?: {
    estadoPago: {
      folio: string;
      fecha: number;
      monto: number;
      url: string;
    }
    factura?: {
      folio: string;
      fecha: number;
      monto: number;
      url: string;
    }
  }[],
  documentos?: any[];
  termofusiones?: {
    desde: number;
    hasta: number;
    cantidad: number;
    diametro: string;
  }[],
  geomembranas?: {
    desde: number;
    hasta: number;
    cantidad: number;
  }[];
  gastos?: {
    item: string;
    categoria: string;
    registro: number;
    monto: number;
    adjunto: string;
  }[]
}

