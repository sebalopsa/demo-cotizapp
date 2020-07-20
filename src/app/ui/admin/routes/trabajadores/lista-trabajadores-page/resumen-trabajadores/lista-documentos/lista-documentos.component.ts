import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentosService } from '../documentos.service';

@Component({
  selector: 'app-lista-documentos',
  templateUrl: './lista-documentos.component.html',
  styleUrls: ['./lista-documentos.component.css']
})
export class ListaDocumentosComponent implements OnInit {
  documentos;
  constructor(
    private activeModal: NgbActiveModal,
    public srv: DocumentosService,
  ) { }

  ngOnInit() {
    this.srv.getDocumentosPorVencer().subscribe(ds => this.documentos = ds)
  }

  close() {
    this.activeModal.close();
  }

  diasRestantes(doc) {
    let hoy = new Date().setUTCHours(12, 0, 0, 0)
    if (doc.vencimiento.activo)
      return (doc.vencimiento.fechaEpoch - hoy) / (24 * 3600 * 1000)
    return
  }

}
