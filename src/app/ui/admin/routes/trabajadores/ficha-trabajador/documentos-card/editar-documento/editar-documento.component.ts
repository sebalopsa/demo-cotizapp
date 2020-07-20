import { Component, OnInit, Input } from '@angular/core';
import { Documento } from '../documentos.service';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { NgbActiveModal, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DocumentosService } from '../documentos.service'
import { Trabajador } from 'src/app/models';


@Component({
  selector: 'editar-documento',
  templateUrl: './editar-documento.component.html',
  styleUrls: ['./editar-documento.component.css']
})
export class EditarDocumentoComponent implements OnInit {
  trabajador: Trabajador
  index: number
  doc: Documento
  form: FormGroup
  nombre: AbstractControl
  vencimiento: FormGroup
  activo: AbstractControl
  fechaObj: AbstractControl
  fechaEpoch: AbstractControl
  loading: boolean

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private srv: DocumentosService,
    private ngbDateParser: NgbDateParserFormatter,

  ) { }

  ngOnInit() {
    this.buildForm()
  }

  buildForm() {
    this.form = this.fb.group({
      nombre: [null, Validators.required],
      vencimiento: this.fb.group({
        activo: false,
        fechaObj: null,
        fechaEpoch: null,
      }),
    })

    this.nombre = this.form.get('nombre');
    this.vencimiento = this.form.get('vencimiento') as FormGroup;
    this.activo = this.vencimiento.get('activo');
    this.fechaObj = this.vencimiento.get('fechaObj');
    this.fechaEpoch = this.vencimiento.get('fechaEpoch');
    
    this.form.patchValue(this.doc)

    this.activo.valueChanges.subscribe(val =>
      val ? this.fechaObj.setValue(this.ngbDateParser.parse(new Date().toISOString())) : this.fechaObj.setValue(null)
    )

    this.fechaObj.valueChanges.subscribe(val =>
      val ? this.fechaEpoch.setValue(new Date(this.ngbDateParser.format(val)).setUTCHours(12, 0, 0, 0)) : this.fechaEpoch.setValue(null)
    )
  }

  tipo() {
    if (this.doc.tipo) {
      if (this.doc.tipo.includes('image'))
        return 'image-';
      if (this.doc.tipo.includes('pdf'))
        return 'pdf-';
    }
    return ''
  }

  cerrar() {
    this.form.reset();
    this.activeModal.close();
  }

  guardar() {
    this.loading = true
    this.srv.editarDocumento(this.trabajador, this.index, this.form.value).then(() => {
      this.loading = false
      this.cerrar()
    })
  }


}
