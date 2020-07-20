import { Injectable } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { StorageService } from 'src/app/services/storage.service';
import { Trabajador } from 'src/app/models';

@Injectable()
export class FotoTrabajadorService {

  constructor(
    private firestoreSrv: FirestoreService,
    private storageSrv: StorageService) { }

  subirFoto(trabajador: Trabajador, foto) {
    let filename = trabajador.rut + '_' + 'foto'
    let storageRef = 'trabajadoresDocumentos/' + filename
    console.log("Comienza subida de foto...")

    this.storageSrv.put(storageRef, foto as File)
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        console.log("Documento almacenado en storage");
        let fotoUrl = { fotoUrl: url }
        this.firestoreSrv.update('trabajadores', trabajador.id, fotoUrl)
        console.log("Base de datos modificada")
      })
  }
}
