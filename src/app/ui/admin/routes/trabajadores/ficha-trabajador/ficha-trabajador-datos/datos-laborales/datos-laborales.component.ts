import { Component, OnInit, Input } from '@angular/core';
import { Trabajador } from 'src/app/models';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'datos-laborales',
  templateUrl: './datos-laborales.component.html',
  styleUrls: ['./datos-laborales.component.css']
})
export class DatosLaboralesComponent implements OnInit {

  @Input() trabajador: Trabajador;
  @Input() editing;
  @Input() trabajadorForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
