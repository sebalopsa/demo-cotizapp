import { Component, OnInit, Input } from '@angular/core';
import { Trabajador } from 'src/app/models';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'datos-medidas-epp',
  templateUrl: './datos-medidas-epp.component.html',
  styleUrls: ['./datos-medidas-epp.component.css']
})
export class DatosMedidasEppComponent implements OnInit {

  @Input() trabajador: Trabajador;
  @Input() editing;
  @Input() trabajadorForm: FormGroup;
  tallaZapatoControl: AbstractControl;

  tallas = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges() {
    if (this.trabajadorForm)
     this.tallaZapatoControl = this.trabajadorForm.get('medidasEpp').get('zapato');
  }

}
