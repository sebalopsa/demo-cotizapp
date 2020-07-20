import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormArray, Validators } from '@angular/forms';
import { RoccflexFacadeService } from 'src/app/store/roccflex/facade';
import { CotizacionesFacadeService } from 'src/app/store/cotizaciones/facade';
import { skipWhile, first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'nueva-cotizacion',
  templateUrl: './nueva-cotizacion.component.html',
  styleUrls: ['./nueva-cotizacion.component.css']
})
export class NuevaCotizacionComponent implements OnInit, OnDestroy {
  cotizacionDraft
  cotizacionForm: FormGroup;
  sociedades: any[];
  isLoading: boolean;

  detalleArray: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private cotFacadeSrv: CotizacionesFacadeService,
    private roccflexFacadeSrv: RoccflexFacadeService,
  ) {
  }

  ngOnInit() {
    this.roccflexFacadeSrv.empresas$.subscribe(object =>
      this.sociedades = Object.values(object)
    )
    this.cotFacadeSrv.nuevaCotizacion$.subscribe(
      (object: any) => {
        this.isLoading = object ? object.isLoading : true
        this.cotizacionDraft = object ? object.draft : {}
      }
    );
    this.cotFacadeSrv.nuevaCotizacion$.pipe(
      map((object: any) => object.draft),
      skipWhile(val => val == null),
      first()
    ).subscribe(draft => {
      this.buildForm(draft);
    })
  }

  ngOnDestroy() {
    this.cotFacadeSrv.closeDraftEditor()
  }

  onClienteSelected(cliente){
    this.cotFacadeSrv.mergeClienteSelection(cliente)
  }


  buildForm(c) {

    this.cotizacionForm = this.formBuilder.group({
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

    this.detalleArray = this.cotizacionForm.get('detalle') as FormArray;

    this.crearFilas(c.detalle);

    this.cotizacionForm.valueChanges.subscribe(formValue => this.cotFacadeSrv.mergeFormChanges(formValue));

    this.cotizacionForm.patchValue(c)
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
    // this.cotFacadeSrv.nuevaCotizacion$.pipe(take(1)).subscribe(cot => this.pdfSrv.generar(cot, true).getDataUrl(url => console.log(url)))
    if(this.cotizacionForm.valid)
      this.cotFacadeSrv.showPreview()
  }

  generar() {
    if(this.cotizacionForm.valid)
      this.cotFacadeSrv.generateDocument()
  }



}
