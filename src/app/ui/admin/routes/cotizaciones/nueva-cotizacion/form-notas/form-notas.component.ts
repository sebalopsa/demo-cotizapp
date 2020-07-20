import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-notas',
  templateUrl: './form-notas.component.html',
  styleUrls: ['./form-notas.component.css']
})
export class FormNotasComponent implements OnInit {
  @Input() parentForm:FormGroup;
  
  constructor() { }

  ngOnInit() {
  }

}
