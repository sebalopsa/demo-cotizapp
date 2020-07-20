import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormArray, Validators } from '@angular/forms';
import { RoccflexFacadeService } from 'src/app/store/roccflex/facade';
import { OoccFacadeService } from 'src/app/store/oocc/facade';
import { skipWhile, first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'nueva-oc',
  templateUrl: './nueva-oc.component.html',
  styleUrls: ['./nueva-oc.component.css']
})
export class NuevaOcComponent implements OnInit, OnDestroy {
  documentDraft
  documentForm: FormGroup;
  sociedades: any[];
  isLoading: boolean;

  detalleArray: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private ooccFacadeSrv: OoccFacadeService,
    private roccflexFacadeSrv: RoccflexFacadeService,
  ) {
  }

  ngOnInit() {
    this.roccflexFacadeSrv.empresas$.subscribe(object =>
      this.sociedades = Object.values(object)
    )
    this.ooccFacadeSrv.nuevaOrdenCompra$.subscribe(
      (object: any) => {
        this.isLoading = object ? object.isLoading : true
        this.documentDraft = object ? object.draft : {}
      }
    );
    this.ooccFacadeSrv.nuevaOrdenCompra$.pipe(
      map((object: any) => object.draft),
      skipWhile(val => val == null),
      first()
    ).subscribe(draft => {
      this.buildForm(draft);
    })
  }

  ngOnDestroy() {
    this.ooccFacadeSrv.closeDraftEditor()
  }

  onClienteSelected(cliente) {
    this.ooccFacadeSrv.mergeClienteSelection(cliente)
  }


  buildForm(c) {

    this.documentForm = this.formBuilder.group({
      emisor: null,
      fechaStr: [null, Validators.required],
      servicio: [null, Validators.required],
      plazo: [null, Validators.pattern('[0-9][0-9]?[0-9]?[0-9]?')],
      vigencia: [null, Validators.pattern('[0-9][0-9]?[0-9]?[0-9]?')],
      divisa: null,
      detalle: this.formBuilder.array([
        this.formBuilder.group({
          descripcion: [null, Validators.required],
          cantidad: [null, [Validators.required, Validators.min(1), Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]],
          unidad: [null, Validators.required],
          precio_unitario: [null, [Validators.required, Validators.min(0), Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]]
        })
      ]),
      notas: null,
      porcentajeUtilidad: [null, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]
    });

    this.detalleArray = this.documentForm.get('detalle') as FormArray;

    this.crearFilas(c.detalle);

    this.documentForm.valueChanges.subscribe(formValue => this.ooccFacadeSrv.mergeFormChanges(formValue));

    this.documentForm.patchValue(c)
  }

  crearFilas(detalle) {
    while (this.detalleArray.length !== 0) {
      this.detalleArray.removeAt(0)
    }

    detalle.forEach(() => {
      this.detalleArray.push(this.formBuilder.group({
        descripcion: [null, Validators.required],
        cantidad: [null, [Validators.required, Validators.min(1), Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]],
        unidad: [null, Validators.required],
        precio_unitario: [null, [Validators.required, Validators.min(0), Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]]
      }))
    })
  }

  agregarFila(index) {
    this.detalleArray.insert(index + 1, this.formBuilder.group({
      descripcion: this.formBuilder.control(null, Validators.required),
      cantidad: [null, [Validators.required, Validators.min(1), Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]],
      unidad: [null, Validators.required],
      precio_unitario: [null, [Validators.required, Validators.min(0), Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]]
    }))
  }

  quitarFila(index) {
    this.detalleArray.removeAt(index);
  }


  vistaPrevia() {
    this.ooccFacadeSrv.showPreview()
  }

  generar() {
    this.ooccFacadeSrv.generateDocument()
  }


  openSelectClienteModal() {
    this.ooccFacadeSrv.openClienteSelector()
  }


}
