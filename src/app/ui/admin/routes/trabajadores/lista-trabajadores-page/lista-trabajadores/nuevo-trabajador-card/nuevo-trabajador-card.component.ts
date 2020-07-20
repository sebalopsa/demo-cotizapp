import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nuevo-trabajador-card',
  templateUrl: './nuevo-trabajador-card.component.html',
  styleUrls: ['./nuevo-trabajador-card.component.css']
})
export class NuevoTrabajadorCardComponent implements OnInit {

  @Input() text;
  @Input() subtext;
  @Input() color;
  @Input() icon;
  @Output() onClick = new EventEmitter();
  hovered: boolean;
  constructor() { }

  ngOnInit() {
  }

  clicked(){
    this.onClick.emit();
  }


}
