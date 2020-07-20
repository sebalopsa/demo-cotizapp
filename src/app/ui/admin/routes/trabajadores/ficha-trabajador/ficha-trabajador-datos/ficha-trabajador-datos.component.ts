import { Component, OnInit, Input } from '@angular/core';
import { Trabajador } from 'src/app/models';
import { EditingFinished } from 'src/app/store/clientes/actions';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ficha-trabajador-datos',
  templateUrl: './ficha-trabajador-datos.component.html',
  styleUrls: ['./ficha-trabajador-datos.component.css']
})
export class FichaTrabajadorDatosComponent implements OnInit {
  @Input() trabajador: Trabajador;
  @Input() editing;
  @Input() trabajadorForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
