import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dev-panel',
  templateUrl: './dev-panel.component.html',
  styleUrls: ['./dev-panel.component.css']
})
export class DevPanelComponent implements OnInit {
  @Input() objeto?: any;
  @Input() array?: any[];

  constructor() { }

  ngOnInit() {
  }

}
