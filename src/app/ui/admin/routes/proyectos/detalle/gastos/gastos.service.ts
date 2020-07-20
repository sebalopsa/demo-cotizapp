import { Injectable } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { StorageService } from 'src/app/services/storage.service';
import { Proyecto } from 'src/app/models';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ProyectoService } from '../proyecto.service';

@Injectable()

export class GastosService {
  categoriasDoc: AngularFirestoreDocument;
  private _categorias = new BehaviorSubject<any>(null)
  readonly categorias$ = this._categorias.asObservable()

  get categorias() {
    return this._categorias.getValue()
  }
  set categorias(val) {
    this._categorias.next(val)
  }

  constructor(
    private db: AngularFirestore,
    private firestoreSrv: FirestoreService,
    private storageSrv: StorageService) {
    this.categoriasDoc = this.db.doc('colecciones/categorias')
    this.categoriasDoc.valueChanges().subscribe(c => this.categorias = c)
    //   this.firestoreSrv.afs.firestore.collection('colecciones').doc('categorias')
    // .get().then(doc => {
    //   cate = doc.data()
    //   return data
    // })
  }

  // cargarCategoriasGastos() {
  //   let data
  //   return this.firestoreSrv.afs.firestore.collection('colecciones').doc('categorias')
  //     .get().then(doc => {
  //       data = doc.data()
  //       return data
  //     })
  // }

  crearCategoriaGastos(cat) {
    if (!this.categorias) {
      return this.firestoreSrv.set('colecciones', 'categorias', { gastos: cat })
    }
    else
      return this.categoriasDoc.update({ gastos: cat })
  }

  subirGasto(proyecto: Proyecto, payload) {
    return this.subirYDevolverConURL(payload)
      .then(gasto => {
        console.log("Comenzando a modificar la base de datos...")
        let gastosPrevios = proyecto.gastos ? [...proyecto.gastos] : [];
        this.firestoreSrv.set(
          'proyectos',
          proyecto.id,
          { gastos: [...gastosPrevios, ...gasto] }
        )
      })
      .then(() => console.log("Base de datos modificada"))
  }

  subirYDevolverConURL(payload) {
    if (payload.file) {
      let filename = payload.registro + '_' + payload.file.name;
      let storageRef = 'documentos/' + filename;
      console.log("Comienza subida de documento...")

      return this.storageSrv.put(storageRef, payload.file)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
          console.log("Documento almacenado en storage");
          delete payload.file
          payload.url = url
          return payload
        })
    }
    return Promise.resolve(payload);
  }

  borrarGasto(proyecto, index, url) {
    let arreglo = proyecto.gastos ? [...proyecto.gastos] : [];
    arreglo.splice(index, 1);
    console.log("Documento a eliminar: indice " + index, arreglo)
    console.log("Modificando base de datos...")

    return this.firestoreSrv.set(
      'proyectos',
      proyecto.id,
      { gastos: arreglo }
    )
      .then(() => {
        console.log("Base de datos modificada");
        console.log("Eliminando de storage...");
        return this.storageSrv.delete(url)
      })
      .then(() => console.log("archivo eliminado de storage"))
      .catch(error => console.log(error))
  }


}
