import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from "@angular/forms";
import { UiFacadeService } from 'src/app/store/ui/facade';
import { TrabajadoresFacadeService } from 'src/app/store/trabajadores/facade';
import { Observable } from 'rxjs';
import { Trabajador } from 'src/app/models';
import { RutValidator } from 'ng2-rut';

@Component({
  selector: 'nuevo-trabajador-modal',
  templateUrl: './nuevo-trabajador-modal.component.html',
  styleUrls: ['./nuevo-trabajador-modal.component.css']
})
export class NuevoTrabajadorModalComponent implements OnInit {
  opened = false;
  loading$: Observable<boolean>;
  nuevoTrabajadorForm: FormGroup;
  rutControl: AbstractControl;
  nombreControl: AbstractControl;
  apellidosControl: AbstractControl;

  constructor(
    private formBuilder: FormBuilder,
    private uiFacadeSrv: UiFacadeService,
    private trabFacadeSrv: TrabajadoresFacadeService,
    private rutValidator: RutValidator
  ) { }

  ngOnInit() {
    this.uiFacadeSrv.modal$.subscribe(m => m == 'nuevo-trabajador' ? this.initialize() : this.opened = false);
    this.loading$ = this.trabFacadeSrv.loading$
  }

  initialize() {
    this.opened = true;
    this.buildForm()
  }

  buildForm() {
    this.nuevoTrabajadorForm = this.formBuilder.group({
      rut: ["", [Validators.required, this.rutValidator]],
      nombre: ["", [Validators.required, Validators.minLength(3)]],
      apellidos: ["", [Validators.required, Validators.minLength(3)]],
      nacimiento: "",
      direccion: "",
      telefono: "",
      email: ["", Validators.email],
      cuenta: this.formBuilder.group({
        banco: "",
        tipo: "",
        numero: ""
      }),
      previsionSocial: "",
      previsionSalud: "",
      cargo: "",
      fechaIngreso: "",
      tipoContrato: "",
      empleador: "",
      medidasEpp: this.formBuilder.group({
        zapato: ["", [Validators.pattern("([1-9]?[0-9])$"), Validators.max(60)]],
        overol: "",
        geologo: "",
        polera: "",
        chaqueta: ""
      }),
    })
    this.rutControl = this.nuevoTrabajadorForm.get('rut');
    this.nombreControl = this.nuevoTrabajadorForm.get('nombre');
    this.apellidosControl = this.nuevoTrabajadorForm.get('apellidos');
  }

  create() {
    this.trabFacadeSrv.create(this.nuevoTrabajadorForm.value);
    this.close();
  }

  close() {
    this.uiFacadeSrv.closeModal();
    if (this.nuevoTrabajadorForm)
      this.nuevoTrabajadorForm.reset();
  }


}
