import { Component, OnInit, Input } from '@angular/core';
import { Proyecto } from 'src/app/models';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarDocumentosComponent } from './agregar-documentos/agregar-documentos.component';
import { DocumentosService } from './documentos.service'
import { EditarDocumentoComponent } from './editar-documento/editar-documento.component';
import { DeleteConfirmComponent } from '../../../shared/delete-confirm/delete-confirm.component';

@Component({
  selector: 'documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent implements OnInit {
  @Input() proyecto: Proyecto;
  hasLoaded: boolean;
  editing: boolean;
  docForm: FormGroup;
  eliminando: boolean;

  constructor(
    private modalSrv: NgbModal,
    private service: DocumentosService
  ) {
  }

  ngOnInit() {

  }

  modalAgregar() {
    let modalRef = this.modalSrv.open(AgregarDocumentosComponent, { size: "lg", backdrop: 'static', scrollable: true });
    modalRef.componentInstance.proyecto = this.proyecto;

  }

  descargar(url) {
    url ? window.open(url, '_blank') : false;
  }
  modalEditar(doc, index) {
    let modalRef = this.modalSrv.open(EditarDocumentoComponent,  { backdrop: 'static' });
    modalRef.componentInstance.proyecto = this.proyecto;
    modalRef.componentInstance.index = index;
    modalRef.componentInstance.doc = doc;
  }


  openEliminarConfirm(index, url) {
    const modalRef = this.modalSrv.open(DeleteConfirmComponent, { size: 'sm', centered: true });
    modalRef.componentInstance.mensaje = "¿Esta seguro que desea eliminar este proyecto?";
    modalRef.componentInstance.clickConfirm.subscribe(() => this.eliminar(index, url))
  }

  eliminar(index, url) {
    this.eliminando = true;
    this.service.borrarDocumento(this.proyecto, index, url)
      .then(() => this.eliminando = false)
      .catch(() => this.eliminando = false)
  }

}
