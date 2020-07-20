import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'stat-average',
  templateUrl: './stat-average.component.html',
  styleUrls: ['./stat-average.component.css']
})
export class StatAverageComponent implements OnChanges {
  @Input() items: any[]
  average: number = 0;
  hover: boolean;

  constructor() { }

  ngOnChanges() {
    this.calcular()
  }

  calcular() {
    if (this.items.length > 0)
      this.average = Math.round(this.items.map(c => c.total).reduce((a, b) => a + b) / this.items.length)
  }

}
