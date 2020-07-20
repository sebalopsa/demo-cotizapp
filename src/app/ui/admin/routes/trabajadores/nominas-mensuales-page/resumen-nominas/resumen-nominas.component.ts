import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NominaMensual } from 'src/app/models';

@Component({
  selector: 'resumen-nominas',
  templateUrl: './resumen-nominas.component.html',
  styleUrls: ['./resumen-nominas.component.css']
})
export class ResumenNominasComponent implements OnInit, OnChanges {
  @Input() nominas: NominaMensual[];
  last: NominaMensual;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.nominas.length)
      this.last = this.nominas[0];
  }

  abreviarMes(mes: string) {
    if (mes)
      return mes.substr(0, 3)
  }

}
