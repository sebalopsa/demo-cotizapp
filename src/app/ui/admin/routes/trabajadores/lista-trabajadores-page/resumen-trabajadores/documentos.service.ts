import { Injectable } from '@angular/core';
import { TrabajadoresDocumentosFacadeService } from 'src/app/store/trabajadores-documentos/facade';
import { TrabajadoresFacadeService } from 'src/app/store/trabajadores/facade';
import { FirestoreService } from 'src/app/services/firestore.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { TrabajadoresService } from '../../trabajadores.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  documentos: any[];
  trabajadores: any[];
  documentosPorVencer: any[] = []

  constructor(
    private trabsSrv: TrabajadoresService,
    private fs: FirestoreService,
    private ngbDateParser: NgbDateParserFormatter
  ) { }

  getDocumentosPorVencer() {
    return this.trabsSrv.getItems().pipe(
      map(ts => {
        return this.mapDocumentosPorVencer(ts);
      })
    )
  }

  mapDocumentosPorVencer(trabajadores) {
    let array = trabajadores.filter(t => t.hasOwnProperty('documentos')).map(
      t => t.documentos.map(doc => ({ ...doc, trabajador: { rut: t.rut, nombre: t.nombre + ' ' + t.apellidos } }))
    )
      .concat([[]]).reduce((a, b) => a.concat(b))
      .filter(doc => doc.vencimiento.activo).filter(doc => {
        let hoy = new Date().setUTCHours(12, 0, 0, 0)
        return ((doc.vencimiento.fechaEpoch - hoy) / (24 * 3600 * 1000) <= 30)
      })
    console.log(array)
    return array

  }











  /// ADVERTENCIA: ESTE MÉTODO ALTERA MASIVAMENTE LOS DATOS
  // mapFromOldModel() {
  //   var batch = this.fs.iniciarBatch()

  //   this.trabajadores.map(t => {
  //     let trabdocs = []
  //     this.documentos.filter(d => d.trabajador == t.rut).map(d => {
  //       trabdocs.push(this.formatDocument(d))
  //     })
  //     let ref = this.fs.obtenerDocRef('trabajadores', t.id)
  //     if (ref && trabdocs.length)
  //       batch.update(ref, { documentos: trabdocs })
  //   })

  //   batch.commit();
  // }

  formatDocument(doc) {
    return {
      nombre: doc.descripcion,
      filename: this.slugify(doc.descripcion),
      url: doc.url ? doc.url : null,
      vencimiento: {
        activo: doc.fechaVencimiento ? true : false,
        fechaEpoch: doc.fechaVencimiento ? doc.fechaVencimiento : null,
        fechaObj: doc.fechaVencimiento ? this.ngbDateParser.parse(new Date(doc.fechaVencimiento).toISOString()) : null
      }
    }


  }

  slugify(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }

}
