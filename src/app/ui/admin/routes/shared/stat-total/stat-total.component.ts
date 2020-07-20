import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'stat-total',
  templateUrl: './stat-total.component.html',
  styleUrls: ['./stat-total.component.css']
})
export class StatTotalComponent implements OnInit {
  @Input() total: number;
  hover: boolean;
  constructor() { }

  ngOnInit() {
  }

}
