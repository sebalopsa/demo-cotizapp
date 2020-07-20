import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vista-general-section',
  templateUrl: './vista-general-section.component.html',
  styleUrls: ['./vista-general-section.component.css']
})
export class VistaGeneralSectionComponent implements OnInit {
  @Input() oocc;
  @Input() count;
  @Output() onNuevaClicked = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  nuevaClicked() {
    this.onNuevaClicked.emit()
  }

}
