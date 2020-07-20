import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { NominasFacadeService } from 'src/app/store/nominas/facade';
import { NominaMensual } from 'src/app/models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-subir-planilla',
  templateUrl: './subir-planilla.component.html',
  styleUrls: ['./subir-planilla.component.css']
})
export class SubirPlanillaComponent implements OnInit {
  file;
  form: FormGroup;
  years = [2019, 2018]
  months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  nomina: NominaMensual;

  constructor(
    private nominasFacadeSrv: NominasFacadeService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      year: 2019,
      month: '01'
    })
  }

  crearNomina(data) {
    let items = data.map(val => {
      let item = {
        rut: this.limpiarRut(val['RUT']),
        anticipo: val['ANTICIPO'],
        finDeMes: val['FIN DE MES'],
        extra: val['EXTRA'],
        imponible: val['IMPONIBLE'],
        afp: val['AFP'],
        afc: val['AFC'],
        salud: val['ISAPRE/FONASA'],
        ccaf: val['CCAF'],
        adicionalSalud: val['ADICIONAL ISAPRE'],
        prestamo: val['PRESTAMO'],
        sis: val['SIS'],
        afc2: val['AFC2'],
        mutual: val['MUTUAL'],
        leyesSociales: val['LEYES SOCIALES'],
        impuestoUnico: val['IMPUESTO UNICO'],
        total: val['TOTAL MES'],
      }
      for (var key in item) {
        if (item[key] == undefined)
          delete item[key]
      }
      return item
    }) as any[];

    let resumen = this.calcularResumen(items);
    this.nomina = Object.assign({}, this.nomina, { resumen, items })
  }

  calcularResumen(items: any[]) {
    return {
      registros: items.length,
      anticipo: items.map(v => v.anticipo || 0).reduce((a, b) => a + b),
      finDeMes: items.map(v => v.finDeMes || 0).reduce((a, b) => a + b),
      leyesSociales: items.map(v => v.leyesSociales || 0).reduce((a, b) => a + b),
      impuestoUnico: items.map(v => v.impuestoUnico || 0).reduce((a, b) => a + b),
      total: items.map(v => v.total || 0).reduce((a, b) => a + b),
    }

  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    console.log(target.files)
    if (target.files.length !== 1) {
      this.limpiar()
      throw new Error('Cannot use multiple files')
    }
    else
      this.file = target.files[0];
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      let data = XLSX.utils.sheet_to_json(ws)
      if (data)
        this.crearNomina(data)
    };
    reader.readAsBinaryString(this.file);
  }

  guardarNomina() {
    this.nomina = Object.assign({}, this.nomina, this.form.value)
    this.nomina.id = this.nomina.year + '-' + this.nomina.month
    this.nomina.monthStr = this.months[Number(this.nomina.month) - 1]
    this.nominasFacadeSrv.create(this.nomina)
  }

  limpiar() {
    this.file = null;
    this.nomina = Object.assign({}, this.nomina, { resumen: null, items: null })
  }

  limpiarRut(rut) {
    rut = rut.replace(/\./g, '').replace('-', '');
    while (rut.charAt(0) === '0') {
      rut = rut.substr(1);
    }
    return rut
  }

  mesNumero(value) {
    return ("0" + (this.months.indexOf(value) + 1)).slice(-2)
  }
}
