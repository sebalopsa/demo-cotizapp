import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

    constructor(public afs: AngularFirestore) {
  }


  getItems(collection: string, persistDeletion?: boolean) {
    if (persistDeletion)
      return this.afs.collection(collection).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
    else
      return this.afs.collection(collection, ref => ref.where('deleted', '==', false)).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  set(collection: string, id: string, object: any) {
    if (object.deleted == null)
      object.deleted = false;
    object.timestamp = Date.now();
    return this.afs.collection(collection).doc(id).set(object, { merge: true })
  }

  create(collection: string, object: any) {
    object.deleted = false;
    object.timestamp = Date.now();
    return this.afs.collection(collection).add(object);
  }

  createWithId(collection: string, object: any, id: any) {
    object.deleted = false;
    object.timestamp = Date.now();
    return this.afs.collection(collection).doc(id).set(object);
  }

  delete(collection: string, id: any) {
    let object = {
      deleted: true,
      timestamp: Date.now()
    }
    return this.afs.collection(collection).doc(id).update(object)
  }

  deleteFull(collection: string, id: any) {
    return this.afs.collection(collection).doc(id).delete()
  }

  update(collection: string, id: any, object: any) {
    object.timestamp = Date.now();
    return this.afs.collection(collection).doc(id).update(object)
  }

  obtenerDocRef(collection, document){
    return this.afs.collection(collection).doc(document).ref
  }

  iniciarBatch(){
    return this.afs.firestore.batch();
  }
}
