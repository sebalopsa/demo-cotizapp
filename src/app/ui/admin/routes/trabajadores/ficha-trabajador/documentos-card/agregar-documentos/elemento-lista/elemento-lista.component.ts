import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { AgregarDocumentosService } from '../agregar-documentos.service';

export interface Elemento {
  nombre: string,
  vencimiento: number,
  file: any,
  tipo: string,
  peso: number
}

@Component({
  selector: 'elemento-lista',
  templateUrl: './elemento-lista.component.html',
  styleUrls: ['./elemento-lista.component.css']
})
export class ElementoListaComponent implements OnInit {
  @Input() documento: FormGroup;
  @Input() index: FormGroup;

  nombre: AbstractControl;
  vencimiento: FormGroup;
  activo: AbstractControl;
  fechaObj: AbstractControl;
  fechaEpoch: AbstractControl;
  constructor(
    private ngbDateParser: NgbDateParserFormatter,
    public srv: AgregarDocumentosService
  ) { }

  ngOnInit() {
    this.nombre = this.documento.get('nombre');
    this.vencimiento = this.documento.get('vencimiento') as FormGroup;
    this.activo = this.vencimiento.get('activo');
    this.fechaObj = this.vencimiento.get('fechaObj');
    this.fechaEpoch = this.vencimiento.get('fechaEpoch');

    this.activo.valueChanges.subscribe(val =>
      val ? this.fechaObj.setValue(this.ngbDateParser.parse(new Date().toISOString())) : this.fechaObj.setValue(null)
    )

    this.fechaObj.valueChanges.subscribe(val =>
      val ? this.fechaEpoch.setValue(new Date(this.ngbDateParser.format(val)).setUTCHours(12, 0, 0, 0)) : this.fechaEpoch.setValue(null)
    )
  }

  tipo() {
    if (this.documento.value.tipo.includes('image'))
      return 'image-';
    else if (this.documento.value.tipo.includes('pdf'))
      return 'pdf-';
    else
      return ''
  }

}
