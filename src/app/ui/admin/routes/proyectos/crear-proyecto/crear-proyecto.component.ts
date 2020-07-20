import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeleccionarCotizacionComponent } from './seleccionar-cotizacion/seleccionar-cotizacion.component';
import { ProyectosService, Proyecto } from '../proyectos.service';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  @Input() proyecto?: Proyecto;

  get nombre() {
    return this.form.get('nombre');
  }
  get ubicacion() {
    return this.form.get('ubicacion');
  }
  get contrato() {
    return this.form.get('contrato');
  }
  get cotizacion() {
    return this.form.get('cotizacion');
  }
  get folio() {
    return this.cotizacion.get('folio');
  }
  get inicio() {
    return this.form.get('inicio');
  }
  get termino() {
    return this.form.get('termino');
  }
  constructor(
    private activeModal: NgbActiveModal,
    private modalSrv: NgbModal,
    private fb: FormBuilder,
    private proyectosSrv: ProyectosService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: [null, Validators.required],
      ubicacion: null,
      contrato: null,
      cotizacion: this.fb.group({
        folio: null,
        totalNeto: null,
        iva: null,
        url: null
      }),
      inicio: null,
      termino: null
    });

    this.inicio.valueChanges.subscribe(v => v === null ? this.termino.setValue(null) : false)
    this.cotizacion.valueChanges.subscribe(() => this.form.markAsDirty())

    if (this.proyecto) {
      this.form.patchValue(this.proyecto)
      this.nombre.disable();
    }
  }

  close() {
    this.activeModal.close();
  }

  openSeleccionarCotizacion() {
    const modalRef = this.modalSrv.open(SeleccionarCotizacionComponent, { centered: true, backdrop: 'static' });
    modalRef.componentInstance.select.subscribe((cotizacion) => {
      this.cotizacion.patchValue(cotizacion);
    });
  }

  submit() {
    this.loading = true;
    if (this.proyecto)
      this.edit();
    else
      this.create();

  }
  create() {
    this.proyectosSrv.create(this.form.value).then(
      () => {
        this.loading = false;
        this.close();
      },
      error => {
        this.loading = false;
        alert('Ha ocurrido un error. Inténtelo nuevamente. \n' + error);
      }
    );
  }
  edit() {
    this.proyectosSrv.update(this.proyecto.id, this.form.value).then(
      () => {
        this.loading = false;
        this.close();
      },
      error => {
        this.loading = false;
        alert('Ha ocurrido un error. Inténtelo nuevamente. \n' + error);
      }
    );
  }

}
