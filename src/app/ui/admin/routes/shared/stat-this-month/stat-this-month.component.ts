import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'stat-this-month',
  templateUrl: './stat-this-month.component.html',
  styleUrls: ['./stat-this-month.component.css']
})
export class StatThisMonthComponent implements OnChanges {
  @Input() items: any[];
  count: number;
  hover: boolean;

  constructor() { }

  ngOnChanges() {
    this.contar();
  }

  contar() {
    if (this.items.length > 0)
      this.count = this.items.filter(c => {
        if (c.fecha) {
          let date = new Date(c.fecha)
          let now = new Date()
          return now.getFullYear() == date.getFullYear() && now.getMonth() == date.getMonth()
        }
        else return false;
      }).length;
  }
}
