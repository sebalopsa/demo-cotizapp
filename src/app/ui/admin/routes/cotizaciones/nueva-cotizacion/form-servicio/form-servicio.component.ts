import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'form-servicio',
  templateUrl: './form-servicio.component.html',
  styleUrls: ['./form-servicio.component.css']
})
export class FormServicioComponent implements OnInit {
  @Input() parentForm: FormGroup;
  servicioControl: AbstractControl;
  plazoControl: AbstractControl;
  vigenciaControl: AbstractControl;

  constructor() { }

  ngOnInit() {
    this.servicioControl = this.parentForm.get('servicio');
    this.plazoControl = this.parentForm.get('plazo');
    this.vigenciaControl = this.parentForm.get('vigencia');
  }

}
