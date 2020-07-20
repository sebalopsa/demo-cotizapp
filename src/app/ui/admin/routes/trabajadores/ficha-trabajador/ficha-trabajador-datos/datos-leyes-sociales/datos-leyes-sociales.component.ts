import { Component, OnInit, Input } from '@angular/core';
import { Trabajador } from 'src/app/models';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'datos-leyes-sociales',
  templateUrl: './datos-leyes-sociales.component.html',
  styleUrls: ['./datos-leyes-sociales.component.css']
})
export class DatosLeyesSocialesComponent implements OnInit {
  @Input() trabajador: Trabajador;
  @Input() editing;
  @Input() trabajadorForm: FormGroup;
  
  afps = ['CUPRUM','HABITAT','PLAN VITAL', 'PROVIDA', 'CAPITAL', 'MODELO', 'UNO'];
  previsiones = ['BANMEDICA','COLMENA','CONSALUD', 'CRUZ BLANCA', 'VIDA TRES', 'FONASA'];

  constructor() { }

  ngOnInit() {
  }

}
