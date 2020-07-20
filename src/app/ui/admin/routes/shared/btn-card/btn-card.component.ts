import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'btn-card',
  templateUrl: './btn-card.component.html',
  styleUrls: ['./btn-card.component.css']
})
export class BtnCardComponent implements OnInit {
  @Input() text;
  @Input() subtext;
  @Input() color;
  @Input() icon;
  @Output() onClick = new EventEmitter();
  hover: boolean;
  constructor() { }

  ngOnInit() {
  }

  clicked(){
    this.onClick.emit();
  }

}
