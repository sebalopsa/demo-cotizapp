import { Component, OnInit, Input } from '@angular/core';
import { Trabajador } from 'src/app/models';
import { EditingFinished } from 'src/app/store/clientes/actions';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'datos-cuenta-bancaria',
  templateUrl: './datos-cuenta-bancaria.component.html',
  styleUrls: ['./datos-cuenta-bancaria.component.css']
})
export class DatosCuentaBancariaComponent implements OnInit {

  @Input() trabajador: Trabajador;
  @Input() editing;
  @Input() trabajadorForm: FormGroup;

  toUpperCase(palabra: String) {
    return palabra.toUpperCase();
  }

  
  bancos = [
    'Banco de Chile',
    'Banco Estado',
    'BCI',
    'Banco Internacional',
    'Scotiabank ',
    'Santander',
    'Santander Banefe',
    'Corpbanca',
    'Banco BICE',
    'Condell',
    'CrediChile',
    'Edwards Citi',
    'HSBC Bank',
    'Itaú',
    'Security',
    'Falabella',
    'Deutche Bank',
    'Ripley',
    'Rabobank',
    'Consorcio',
    'Penta',
    'Paris',
    'BBVA',
    'The Royal Bank'
  ]

  bancosOrdenados = this.bancos.sort();

tiposCuenta = [
  'CUENTA CORRIENTE',
  'CUENTA VISTA',
  'CHEQUERA ELECTRONICA',
  'CUENTA DE AHORRO'
]

  constructor() { }

  ngOnInit() {
  }

}
