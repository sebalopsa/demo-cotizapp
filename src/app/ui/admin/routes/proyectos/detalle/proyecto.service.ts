import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Proyecto } from '../proyectos.service';
import { map } from 'rxjs/operators';

@Injectable()
export class ProyectoService {
  private proyectoDoc: AngularFirestoreDocument<Proyecto>;
  proyecto$: Observable<Proyecto>;

  constructor(
    private db: AngularFirestore,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      if (params.id) {
        const id = params.id;
        this.proyectoDoc = this.db.doc<Proyecto>('proyectos/' + id);
        this.proyecto$ = this.proyectoDoc.snapshotChanges().pipe(
          map(action => {
            const data = action.payload.data() as Proyecto;
            const id = action.payload.id;
            return { id, ...data };
          })
        );
      }
    });
  }

  update(data) {
    data.timestamp = Date.now();
    return this.proyectoDoc.update(data);
  }

  delete() {
    return this.proyectoDoc.delete();
  }
}
