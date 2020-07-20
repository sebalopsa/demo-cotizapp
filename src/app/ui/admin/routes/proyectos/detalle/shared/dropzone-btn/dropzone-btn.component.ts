import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DropzoneDirective } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'dropzone-btn',
  templateUrl: './dropzone-btn.component.html',
  styleUrls: ['./dropzone-btn.component.css']
})
export class DropzoneBtnComponent implements OnInit {
  file: File;
  @Input() docName?: string;
  @Output() fileLoaded: EventEmitter<File> = new EventEmitter();
  loading: boolean;
  drag: boolean;   //Variable para controlar el estilo del dropzone cuando se mantiene una archivo encima
  error: boolean;             //Variable para controlar el estilo del dropzone cuando ocurre un error
  @ViewChild(DropzoneDirective, { static: false }) dropzone?: DropzoneDirective; //instancia de dropzone 

  config = {
    uploadMultiple: false,
    createImageThumbnails: false,
    previewTemplate: `<div></div>`
  }
  constructor() { }

  ngOnInit() {
  }

  onUploadError() {
    console.log("error ql")
    this.dropzone.reset();
    this.error = true;
  }

  onUploadSuccess(files) {
    this.file = files[0]
    this.fileLoaded.emit(this.file)
    this.dropzone.reset()
  }

  placeholder() {
    return 'Arrastre su ' + (this.docName || 'archivo') + ' aquí o haga click para seleccionar'
  }

}
