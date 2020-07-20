import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-empresa',
  templateUrl: './form-empresa.component.html',
  styleUrls: ['./form-empresa.component.css']
})
export class FormEmpresaComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() sociedades: any[];

  constructor() { }

  ngOnInit() {
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.rut === c2.rut : c1 === c2;
  }

}
