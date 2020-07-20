import { Component, OnInit, Input } from '@angular/core';
import { Trabajador } from 'src/app/models';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  @Input() trabajador: Trabajador;
  @Input() editing;
  @Input() trabajadorForm: FormGroup;
  rutControl: AbstractControl;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.trabajadorForm)
      this.rutControl = this.trabajadorForm.get('rut')
  }

}
