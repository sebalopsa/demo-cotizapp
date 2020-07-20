import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cotizacion } from 'src/app/models';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class SeleccionarCotizacionService {

  cotizacionesCollection: AngularFirestoreCollection<Cotizacion>;

  constructor(private db: AngularFirestore) {
    this.cotizacionesCollection = db.collection('cotizaciones', ref => ref.where('estado', '==', 'aceptada'));
  }

  getCotizaciones(): Observable<Cotizacion[]> {
    return this.cotizacionesCollection.snapshotChanges().pipe(
      map(actions => actions.map(
        el => {
          const id = el.payload.doc.id;
          const data = el.payload.doc.data() as Cotizacion;
          return { id, ...data };
        }
      ))
    );
  }



}
