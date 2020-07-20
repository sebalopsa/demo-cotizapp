import { Component, OnInit, Input } from '@angular/core';
import { NominaMensual } from 'src/app/models';
import { NominasFacadeService } from 'src/app/store/nominas/facade';

@Component({
  selector: 'lista-nominas',
  templateUrl: './lista-nominas.component.html',
  styleUrls: ['./lista-nominas.component.css']
})
export class ListaNominasComponent implements OnInit {
  @Input() nominas: NominaMensual[];
  hovered;
  constructor(private nomFacadeSrv: NominasFacadeService) { }

  ngOnInit() {
  }

  delete(doc) {
    this.nomFacadeSrv.delete(doc.id)
  }

}
