import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { count } from 'rxjs/operators';

@Component({
  selector: 'vista-general-section',
  templateUrl: './vista-general-section.component.html',
  styleUrls: ['./vista-general-section.component.css']
})
export class VistaGeneralSectionComponent implements OnInit {
  @Input() eepp;
  @Input() count;
  @Output() onNuevoClicked = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  nuevoClicked(){
    this.onNuevoClicked.emit()
  }

}
