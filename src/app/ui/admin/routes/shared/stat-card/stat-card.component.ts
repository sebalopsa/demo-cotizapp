import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.css']
})
export class StatCardComponent implements OnInit {
  @Input() stat: number;
  @Input() subtext: string;
  @Input() icon: string;

  hover: boolean;
  constructor() { }

  ngOnInit() {
  }

}
