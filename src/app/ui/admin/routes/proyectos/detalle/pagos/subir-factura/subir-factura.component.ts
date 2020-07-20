import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PagosService } from '../pagos.service';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Proyecto } from 'src/app/models';

@Component({
  selector: 'subir-factura',
  templateUrl: './subir-factura.component.html',
  styleUrls: ['./subir-factura.component.css']
})
export class SubirFacturaComponent implements OnInit {
  proyecto: Proyecto;
  pagoIndex: number;

  form: FormGroup;
  fechaCtrl: AbstractControl;
  montoCtrl: AbstractControl;
  fileCtrl: AbstractControl;
  folioCtrl: AbstractControl;

  uploading: boolean;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private srv: PagosService,
  ) { }

  ngOnInit() {
    this.buildForm()
  }

  buildForm() {
    this.form = this.fb.group({
      folio: [null, Validators.required], 
      fecha: [null, Validators.required],
      monto: [null, [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]],
      file: [null, Validators.required]
    })
    this.fechaCtrl = this.form.get('fecha');
    this.montoCtrl = this.form.get('monto');
    this.folioCtrl = this.form.get('folio');
    this.fileCtrl = this.form.get('file');
  }

  subir() {
    this.uploading = true
    this.srv.subirFactura(this.proyecto, this.pagoIndex, this.form.value)
      .then(() => { this.uploading = false; this.cerrar() })
      .catch(error => console.log(error));
  }

  cerrar() {
    this.activeModal.close();
  }

}
