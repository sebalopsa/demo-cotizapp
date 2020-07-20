import { Component, OnChanges, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'form-fecha',
  templateUrl: './form-fecha.component.html',
  styleUrls: ['./form-fecha.component.css']
})
export class FormFechaComponent implements OnChanges {
  @Input() parentForm: FormGroup;
  fechaControl: AbstractControl;

  constructor() { }

  ngOnChanges() {
    this.fechaControl = this.parentForm.get('fechaStr');
  }

}
