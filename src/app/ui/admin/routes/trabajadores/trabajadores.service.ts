import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrabajadoresService {
  trabajadoresCollection: AngularFirestoreCollection<Trabajador>;

  constructor(
    private db: AngularFirestore
  ) {
    this.trabajadoresCollection = this.db.collection<Trabajador>('trabajadores', ref => ref.orderBy('apellidos', 'asc'));
  }

  getItems() {
    return this.trabajadoresCollection.snapshotChanges().pipe(
      map(action => action.map(
        a => {
          const id = a.payload.doc.id;
          const trabajador = a.payload.doc.data() as Trabajador;
          return { ...trabajador, id }
        }
      ))
    );
  }
}


export interface Trabajador {
  id?: string,
  rut?: string,
  nombre?: string,
  apellidos?: string,
  fechaNacimiento?: number,
  direccion?: string,
  telefono?: string,
  email?: string,
  cuenta?: {
    banco?: string,
    tipo?: string,
    numero?: string
  },
  previsionSocial?: string,
  previsionSalud?: string,
  cargo?: string,
  empleador?: string,
  tipoContrato?: string,
  fechaIngreso?: number,
  medidasEpp?: {
    zapato?: number,
    overol?: string,
    geologo?: string,
    polera?: string,
    chaqueta?: string
  },
  fotoUrl?: string,
  virgin?: boolean,
  deleted?: boolean,
  timestamp?: number,
  documentos?: any[],
  inactivo?: boolean,
}
