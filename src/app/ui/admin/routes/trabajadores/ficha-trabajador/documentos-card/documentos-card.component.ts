import { Component, OnInit, Input } from '@angular/core';
import { Trabajador } from 'src/app/models';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarDocumentosComponent } from './agregar-documentos/agregar-documentos.component';
import { DocumentosService } from './documentos.service'
import { EditarDocumentoComponent } from './editar-documento/editar-documento.component';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'documentos-card',
  templateUrl: './documentos-card.component.html',
  styleUrls: ['./documentos-card.component.css'],
})
export class DocumentosCardComponent implements OnInit {
  @Input() trabajador: Trabajador;
  hasLoaded: boolean;
  editing: boolean;
  docForm: FormGroup;
  eliminando: boolean;
  testing: boolean;

  constructor(
    private modalSrv: NgbModal,
    private service: DocumentosService
  ) {
  }

  ngOnInit() {
    this.testing = environment['name'] == 'test';

  }

  modalAgregar() {
    let modalRef = this.modalSrv.open(AgregarDocumentosComponent, { size: "lg", backdrop: 'static' });
    modalRef.componentInstance.trabajador = this.trabajador;
  }

  descargar(url) {
    url ? window.open(url, '_blank') : false;
  }
  modalEditar(doc, index) {
    let modalRef = this.modalSrv.open(EditarDocumentoComponent, { backdrop: 'static' });
    modalRef.componentInstance.trabajador = this.trabajador;
    modalRef.componentInstance.index = index;
    modalRef.componentInstance.doc = doc;
  }
  eliminar(index, url) {
    this.eliminando = true;
    this.service.borrarDocumento(this.trabajador, index, url)
      .then(() => this.eliminando = false)
      .catch(() => this.eliminando = false)
  }


  diasRestantes(doc) {
    let hoy = new Date().setUTCHours(12, 0, 0, 0)
    if (doc.vencimiento.activo)
      return (doc.vencimiento.fechaEpoch - hoy) / (24 * 3600 * 1000)
    return
  }

}
