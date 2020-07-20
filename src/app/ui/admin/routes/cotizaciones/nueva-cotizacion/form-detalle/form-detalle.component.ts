import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormArray, Validators } from '@angular/forms';
import { Cotizacion } from 'src/app/models';

@Component({
  selector: 'form-detalle',
  templateUrl: './form-detalle.component.html',
  styleUrls: ['./form-detalle.component.css']
})
export class FormDetalleComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() cotizacion: Cotizacion;
  @Output() onAdd = new EventEmitter();
  @Output() onRemove = new EventEmitter();

  detalleArray: FormArray;

  constructor() { }

  ngOnInit() {
    this.detalleArray = this.parentForm.get('detalle') as FormArray;
  }


  subtotal(item) {
    return item.cantidad * item.precio_unitario
  }

  agregar(index) {
    this.onAdd.emit(index)
  }

  quitar(index) {
    this.onRemove.emit(index)
  }

}
