import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { TrabajadoresService, Trabajador } from '../trabajadores.service';
import { Observable } from 'rxjs';

@Injectable()
export class TrabajadorService {
  trabajadorDoc: AngularFirestoreDocument<Trabajador>
  trabajador$: Observable<Trabajador>;

  constructor(
    private db: AngularFirestore,
    private route: ActivatedRoute,
    private trabajadoresSrv: TrabajadoresService
  ) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.trabajadorDoc = this.db.doc<Trabajador>('trabajadores/' + id);
      this.trabajador$ = this.trabajadorDoc.valueChanges();
    });

  }

  desvincular() {
    return this.trabajadorDoc.update({ inactivo: true })
  }
  reincorporar() {
    return this.trabajadorDoc.update({ inactivo: false })
  }



}
