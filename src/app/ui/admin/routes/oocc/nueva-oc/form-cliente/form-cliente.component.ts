import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit {
  @Input() document: any;
  @Output() onClick= new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clicked() {
    this.onClick.emit()
  }
}
