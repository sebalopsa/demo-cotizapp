import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Trabajador, TrabajadorDocumento } from 'src/app/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListaDocumentosComponent } from './lista-documentos/lista-documentos.component'
import { DocumentosService } from './documentos.service';
@Component({
  selector: 'resumen-trabajadores',
  templateUrl: './resumen-trabajadores.component.html',
  styleUrls: ['./resumen-trabajadores.component.css'],
  providers: [DocumentosService]
})
export class ResumenTrabajadoresComponent implements OnInit, OnChanges {
  @Input() trabajadores: Trabajador[];
  nTrab: number;
  nDocs: number;

  constructor(
    private modalSrv: NgbModal,
    public srv: DocumentosService
  ) { }

  ngOnInit() {
    this.srv.getDocumentosPorVencer().subscribe(
      ds => this.nDocs = ds.length
    )
  }

  ngOnChanges() {
    if (this.trabajadores) {
      this.nTrab = this.trabajadores.length;
    }
  }


  openModal() {
    const modalRef = this.modalSrv.open(ListaDocumentosComponent);
  }




}
