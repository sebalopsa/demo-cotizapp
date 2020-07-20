import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Trabajador } from 'src/app/models';
import { AgregarDocumentosService } from './agregar-documentos.service';


@Component({
  selector: 'agregar-documento',
  templateUrl: './agregar-documentos.component.html',
  styleUrls: ['./agregar-documentos.component.css'],
  providers: [AgregarDocumentosService]
})
export class AgregarDocumentosComponent implements OnInit {
  trabajador: Trabajador;

  constructor(
    public activeModal: NgbActiveModal,
    public srv: AgregarDocumentosService
  ) { }

  ngOnInit() {
    this.srv.construirForm();
  }

  cerrar() {
    this.srv.limpiarForm();
    this.activeModal.close();
  }

  subir() {
    this.srv.clickSubir(this.trabajador).then(() => this.cerrar())
  }





}
