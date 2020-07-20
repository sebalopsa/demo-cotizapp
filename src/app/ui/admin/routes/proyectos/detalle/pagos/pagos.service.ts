import { Injectable } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Proyecto } from 'src/app/models';
import { StorageService } from 'src/app/services/storage.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class PagosService {

  constructor(
    private firestoreSrv: FirestoreService,
    private storageSrv: StorageService,
    private ngbDateParser: NgbDateParserFormatter

  ) { }

  agregarPago(proyecto, doc) {
    let pagosPrevios = proyecto.pagos ? [...proyecto.pagos] : [];
    let pagoNuevo = [{ estadoPago: this.resumirEstadoDePago(doc) }]
    this.firestoreSrv.set(
      'proyectos',
      proyecto.id,
      { pagos: [...pagosPrevios, ...pagoNuevo] }
    )
  }

  resumirEstadoDePago(doc) {
    return (({ folio, fecha, total, url }) => ({
      folio,
      fecha,
      monto: total,
      url
    }))(doc)
  }

  subirFactura(proyecto: Proyecto, pagoIndex: number, payload) {
    return this.subirYDevolverConURL(payload)
      .then(payload => this.convertirFecha(payload))
      .then(payload => {
        console.log("Comenzando a modificar la base de datos...")
        console.log(payload)
        let pagosArray = proyecto.pagos ? [...proyecto.pagos] : [];
        pagosArray[pagoIndex] = { ...pagosArray[pagoIndex], factura: payload }
        console.log(pagosArray)
        return this.firestoreSrv.set(
          'proyectos',
          proyecto.id,
          { pagos: pagosArray }
        )
      })
      .then(() => console.log("Base de datos modificada"))
  }

  subirYDevolverConURL(payload) {
    let filename = new Date().getTime() + '_' + payload.file.name;
    let storageRef = 'facturas/' + filename;
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

  convertirFecha(payload) {
    if (payload.hasOwnProperty('fecha'))
      payload['fecha'] = new Date(this.ngbDateParser.format(payload['fecha'])).setUTCHours(12, 0, 0, 0)
    return payload
  }

}
