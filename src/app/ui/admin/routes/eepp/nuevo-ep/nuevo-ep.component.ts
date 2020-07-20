import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormArray, Validators } from '@angular/forms';
import { RoccflexFacadeService } from 'src/app/store/roccflex/facade';
import { EeppFacadeService } from 'src/app/store/eepp/facade';
import { skipWhile, first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'nuevo-ep',
  templateUrl: './nuevo-ep.component.html',
  styleUrls: ['./nuevo-ep.component.css']
})
export class NuevoEpComponent implements OnInit, OnDestroy {
  documentDraft
  documentForm: FormGroup;
  sociedades: any[];
  isLoading: boolean;

  detalleArray: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private eeppFacadeSrv: EeppFacadeService,
    private roccflexFacadeSrv: RoccflexFacadeService,
  ) {
  }

  ngOnInit() {
    this.roccflexFacadeSrv.empresas$.subscribe(object =>
      this.sociedades = Object.values(object)
    )
    this.eeppFacadeSrv.nuevoEstadoPago$.subscribe(
      (object: any) => {
        this.isLoading = object ? object.isLoading : true
        this.documentDraft = object ? object.draft : {}
      }
    );
    this.eeppFacadeSrv.nuevoEstadoPago$.pipe(
      map((object: any) => object.draft),
      skipWhile(val => val == null),
      first()
    ).subscribe(draft => {
      this.buildForm(draft);
    })
  }

  ngOnDestroy() {
    this.eeppFacadeSrv.closeDraftEditor()
  }

  onClienteSelected(cliente) {
    this.eeppFacadeSrv.mergeClienteSelection(cliente)
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

    this.documentForm.valueChanges.subscribe(formValue => this.eeppFacadeSrv.mergeFormChanges(formValue));

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
    this.eeppFacadeSrv.showPreview()
  }

  generar() {
    this.eeppFacadeSrv.generateDocument()
  }


  openSelectClienteModal() {
    this.eeppFacadeSrv.openClienteSelector()
  }


}
