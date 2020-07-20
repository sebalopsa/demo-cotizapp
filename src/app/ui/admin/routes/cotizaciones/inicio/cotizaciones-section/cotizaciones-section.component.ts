import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cotizaciones-section',
  templateUrl: './cotizaciones-section.component.html',
  styleUrls: ['./cotizaciones-section.component.css']
})
export class CotizacionesSectionComponent implements OnInit {
  @Input() cotizaciones;
  filter: string;

  constructor() { }

  ngOnInit() {
  }

}
