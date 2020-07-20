import { Component, OnChanges, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'form-totales',
  templateUrl: './form-totales.component.html',
  styleUrls: ['./form-totales.component.css']
})
export class FormTotalesComponent implements OnChanges {
  @Input() parentForm: FormGroup;
  @Input() document: any;
  porcentajeUtilidadControl: AbstractControl;

  constructor() { }

  ngOnChanges() {
    this.porcentajeUtilidadControl = this.parentForm.get('porcentajeUtilidad');
  }

}
