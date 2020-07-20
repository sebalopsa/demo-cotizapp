import { Component, OnChanges, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Cotizacion } from 'src/app/models';

@Component({
  selector: 'form-totales',
  templateUrl: './form-totales.component.html',
  styleUrls: ['./form-totales.component.css']
})
export class FormTotalesComponent implements OnChanges {
  @Input() parentForm: FormGroup;
  @Input() cotizacion: Cotizacion;
  porcentajeUtilidadControl: AbstractControl;

  constructor() { }

  ngOnChanges() {
    this.porcentajeUtilidadControl = this.parentForm.get('porcentajeUtilidad');
  }

}
