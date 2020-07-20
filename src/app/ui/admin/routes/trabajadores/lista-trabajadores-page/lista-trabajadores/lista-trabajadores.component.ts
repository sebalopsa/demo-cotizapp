import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as XLSX from 'xlsx';
import { RutPipe } from 'ng2-rut';
import { UiFacadeService } from 'src/app/store/ui/facade';
import { Trabajador } from '../../trabajadores.service';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'lista-trabajadores',
  templateUrl: './lista-trabajadores.component.html',
  styleUrls: ['./lista-trabajadores.component.css']
})
export class ListaTrabajadoresComponent implements OnInit {
  @Input() trabajadores: Trabajador[];
  @Input() loading;

  filter;

  get trabajadoresActivos() {
    return this.trabajadores.filter(t => !t.inactivo)
  }
  get trabajadoresInactivos() {
    return this.trabajadores.filter(t => t.inactivo)
  }

  constructor(
    private uiFacadeSrv: UiFacadeService,
    private rutPipe: RutPipe
  ) { }

  ngOnInit() {
  }

  showNuevoTrabajadorModal() {
    this.uiFacadeSrv.openModal('nuevo-trabajador')
  }
  exportar() {
    let c = this.trabajadores.map((t: Trabajador) => {
      let object: any;
      object = Object.assign({}, t)
      object.rut = this.rutPipe.transform(object.rut)
      object.empleador = this.rutPipe.transform(object.empleador)
      if (t.cuenta) {
        object.cuentaBanco = t.cuenta.banco;
        object.cuentaTipo = t.cuenta.tipo;
        object.cuentaNumero = t.cuenta.numero
      }
      delete object.cuenta
      if (t.medidasEpp) {
        object.tallaZapato = t.medidasEpp.zapato;
        object.tallaGeologo = t.medidasEpp.geologo;
        object.tallaOveroll = t.medidasEpp.overol;
        object.tallaPolera = t.medidasEpp.polera;
        object.tallaChaqueta = t.medidasEpp.chaqueta;
      }
      delete object.medidasEpp

      delete object.virgin
      delete object.deleted
      delete object.timestamp

      return object;
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(c);

    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    let blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
    const url = URL.createObjectURL(blob)

    window.open(url, "Download")
  }

  irADashboard() {
    window.open("https://us.qlikcloud.com/view/5cc8549eb015eb07cd75b647", '_blank');
  }
}
