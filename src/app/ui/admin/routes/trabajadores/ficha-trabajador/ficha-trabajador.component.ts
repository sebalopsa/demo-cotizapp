import { Component, OnInit } from '@angular/core';
import { TrabajadoresFacadeService } from 'src/app/store/trabajadores/facade';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RutValidator } from 'ng2-rut';
import { TrabajadorService } from './trabajador.service';
import { Trabajador } from '../trabajadores.service';


@Component({
  selector: 'ficha-trabajador',
  templateUrl: './ficha-trabajador.component.html',
  styleUrls: ['./ficha-trabajador.component.css'],
  providers: [TrabajadorService]
})
export class FichaTrabajadorComponent implements OnInit {

  trabajador: Trabajador;
  trabajadorForm: FormGroup;
  documentos = [1, 2, 3, 5] // arreglo de prueba: borrar luego de conectar con store
  editing: boolean = false;

  constructor(
    private srv: TrabajadorService,
    private trabFacadeSrv:
      TrabajadoresFacadeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private rutValidator: RutValidator
  ) { }

  ngOnInit() {
    this.srv.trabajador$.subscribe(t => {
      if (t) {
        this.trabajador = t;
      }
    })
  }

  buildForm(trabajador: Trabajador) {
    let form = this.formBuilder.group({
      rut: [null, [Validators.required, this.rutValidator]],
      nombre: [null, [Validators.required, Validators.minLength(3)]],
      apellidos: [null, [Validators.required, Validators.minLength(3)]],
      nacimiento: null,
      direccion: null,
      telefono: null,
      email: [null, Validators.email],
      cuenta: this.formBuilder.group({
        banco: null,
        tipo: null,
        numero: null
      }),
      previsionSocial: null,
      previsionSalud: null,
      cargo: null,
      fechaIngreso: null,
      tipoContrato: null,
      empleador: null,
      medidasEpp: this.formBuilder.group({
        zapato: [null, [Validators.pattern("([1-9]?[0-9])$"), Validators.max(60)]],
        overol: null,
        geologo: null,
        polera: null,
        chaqueta: null
      }),
    })
    form.patchValue(trabajador);
    return form;
  }


  editar() {
    this.trabajadorForm = this.buildForm(this.trabajador);
    this.editing = true;
  }

  finishEdit() {
    if (this.trabajador.virgin)
      this.trabFacadeSrv.update(this.trabajador.rut, { virgin: false })
    this.editing = false;
  }

  back() {
    this.finishEdit();
    this.router.navigateByUrl('/trabajadores/lista');
  }

  modalEliminar(confirmContent) {
    this.modalService.open(confirmContent);
  }

  eliminar() {
    this.trabFacadeSrv.delete(this.trabajador.rut)
  }

  cancel() {
    this.finishEdit()
  }

  save() {
    let document = Object.assign({}, this.trabajadorForm.value, { virgin: false })
    this.trabFacadeSrv.update(this.trabajador.rut, document)
    this.editing = false;
  }

  desvincular(){
    this.srv.desvincular().then(()=>console.log('trabajador desvinculado'));
  }

  reincorporar(){
    this.srv.reincorporar().then(()=>console.log('trabajador reincorporado'));
  }


}
