import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Proyecto } from 'src/app/models';
import { NgbActiveModal, NgbPopover, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GastosService } from '../gastos.service';

export interface Gasto {
  item: string,
  categoria: string,
  registro: number,
  monto: number,
  adjunto: string
}

@Component({
  selector: 'nuevo-gasto',
  templateUrl: './nuevo-gasto.component.html',
  styleUrls: ['./nuevo-gasto.component.css'],
  providers: [GastosService]
})
export class NuevoGastoComponent implements OnInit {

  gasto: Gasto
  gastos: Gasto[]
  form: FormGroup
  proyecto: Proyecto
  item: AbstractControl
  categoria: AbstractControl
  monto: AbstractControl
  file: AbstractControl
  registro: AbstractControl
  @ViewChild('p', { static: false }) popover: NgbPopover
  uploading: boolean
  categorias = [];
  loading: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private srv: GastosService,
    private ngbDateParser: NgbDateParserFormatter,
  ) { }

  ngOnInit() {
    this.crearForm()
    this.srv.categorias$.subscribe(cs => this.categorias = cs ? cs.gastos : [])
  }

  crearForm() {
    this.form = this.fb.group({
      item: [null, Validators.required],
      categoria: [null, Validators.required],
      monto: [null, [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]],
      file: null,
      registro: this.ngbDateParser.parse(new Date().toISOString())
    })
    this.item = this.form.get('item')
    this.categoria = this.form.get('categoria')
    this.monto = this.form.get('monto')
    this.file = this.form.get('file')
    this.registro = this.form.get('registro')
    this.categoria.valueChanges.subscribe(v => {
      if (v == 'nueva') {
        this.popover.open()
      }
    })
  }

  guardar() {
    this.uploading = true
    console.log(this.file.value)
    this.registro.setValue(new Date(this.ngbDateParser.format(this.registro.value)).setUTCHours(12, 0, 0, 0))
    this.srv.subirGasto(this.proyecto, this.form.value)
      .then(() => { this.uploading = false; this.close() })
      .catch(error => console.log(error));
  }

  close() {
    this.activeModal.close()
  }

  // modificar base de datos (categorias)
  crearCategoria(input: any) {
    this.loading = true;
    if (input.value) {
      this.categorias = [input.value, ...this.categorias]

      this.srv.crearCategoriaGastos(this.categorias).then(() => {
        this.categoria.setValue(input.value);
        this.loading = false;
        this.popover.close();
      },
        (err) => {
          this.loading = false;
          alert(err)
        }
      )


    }
  }

}



// import { Pipe, PipeTransform } from "@angular/core";

// const PADDING = "000000";

// @Pipe({ name: "thousandsPipe" })
// export class ThousandsPipe implements PipeTransform {

//   private DECIMAL_SEPARATOR: string;
//   private THOUSANDS_SEPARATOR: string;

//   constructor() {
//     // TODO Puedes configurar los separadores que prefieras
//     this.DECIMAL_SEPARATOR = ",";
//     this.THOUSANDS_SEPARATOR = ".";
//   }

//   transform(value: number | string, fractionSize: number = 2): string {
//     let [ integer, fraction = "" ] = (value || "").toString()
//       .split(this.DECIMAL_SEPARATOR); // Divide entre parte entera y decimal, por la "," en este caso

//     fraction = fractionSize > 0
//       ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
//       : "";

//     integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);

//     return integer + fraction;
//   }

//   parse(value: string, fractionSize: number = 2): string {
//     let [ integer, fraction = "" ] = (value || "").split(this.DECIMAL_SEPARATOR);

//     integer = integer.replace(new RegExp(this.THOUSANDS_SEPARATOR, "g"), "");

//     fraction = parseInt(fraction, 10) > 0 && fractionSize > 0
//       ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
//       : "";

//     return integer + fraction;
//   }

// }