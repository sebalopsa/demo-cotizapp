import { Component, OnInit, ViewChild } from '@angular/core';
import { DropzoneDirective } from 'ngx-dropzone-wrapper';
import { AgregarDocumentosService } from '../agregar-documentos.service';

@Component({
  selector: 'boton-dropzone',
  templateUrl: './boton-dropzone.component.html',
  styleUrls: ['./boton-dropzone.component.css']
})
export class BotonDropzoneComponent implements OnInit {

  drag: boolean;   //Variable para controlar el estilo del dropzone cuando se mantiene una archivo encima
  loading: boolean;             //Variable para controlar el estilo del dropzone cuando está cargando un archivo
  error: boolean;             //Variable para controlar el estilo del dropzone cuando ocurre un error
  @ViewChild(DropzoneDirective, { static: false }) dropzone?: DropzoneDirective; //instancia de dropzone 

  config = {
    uploadMultiple: true,
    createImageThumbnails: false,
    previewTemplate: `<div></div>`
  }

  constructor(public agregarSrv: AgregarDocumentosService) { }

  ngOnInit() {
  }

  onUploadError() {
    console.log("error ql")
    this.dropzone.reset();
    this.error = true;
  }

  onUploadSuccess(files) {
    let file = files[0]
    this.agregarSrv.agregarDocumento(file)
    this.dropzone.reset()
  }

}
