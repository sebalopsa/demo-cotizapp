import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Cliente } from 'src/app/models'
import { FormGroup, FormBuilder, AbstractControl, FormArray, Validators } from '@angular/forms';
import { ClientesFacadeService } from 'src/app/store/clientes/facade';
import { Observable, Subscription } from 'rxjs';
import { UiFacadeService } from 'src/app/store/ui/facade';
import { CotizacionesFacadeService } from 'src/app/store/cotizaciones/facade';
import { takeWhile, first } from 'rxjs/operators';

@Component({
  selector: 'select-cliente-modal',
  templateUrl: './select-cliente-modal.component.html',
  styleUrls: ['./select-cliente-modal.component.css'],
})
export class SelectClienteModalComponent implements OnInit {
  @Output() onSelected= new EventEmitter();
  opened: boolean;
  loading$: Observable<boolean>;
  isEditing: boolean;
  clientes$: Observable<Cliente[]>;
  clienteForm: FormGroup;
  formSubscription: Subscription;
  filter: string;
  editId: string;
  showNuevoClienteRow: boolean;
  @ViewChild('tableScroll', {static: false}) tableScroll: ElementRef;
  clienteNombreControl: AbstractControl;

  constructor(
    private cliFacadeSrv: ClientesFacadeService,
    private uiFacadeSrv: UiFacadeService,
    private cotsFacadeSrv: CotizacionesFacadeService,
    private formBuilder: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.iniciarForm();
    this.uiFacadeSrv.modal$.subscribe(m => (m == 'select-cliente') ? this.mostrarModal() : this.ocultarModal())
    this.clientes$ = this.cliFacadeSrv.clientes$;
    this.loading$ = this.cliFacadeSrv.loading$;
    this.cliFacadeSrv.editing$.subscribe(value => {
      value ? this.conectarConStore() : this.desconectarDeStore()
      this.isEditing = value
    })
    this.cliFacadeSrv.temp$.subscribe(temp => {
      this.showNuevoClienteRow = (temp && !temp.id);
      this.editId = (temp && temp.id) ? temp.id : null;
    })
  }

  seleccionar(cliente) {
    this.onSelected.emit(cliente)
  }

  nuevo() {
    this.cliFacadeSrv.addNew();
    this.tableScroll.nativeElement.scrollTop = 0
  }

  editar(cliente) {
    this.cliFacadeSrv.editOne(cliente)
  }

  descartarCambios() {
    this.cliFacadeSrv.discardChanges()
  }

  guardarCambios() {
    this.cliFacadeSrv.saveChanges();
  }

  eliminar(id) {
    this.cliFacadeSrv.deleteOne(id)
  }

  cerrar() {
    this.cotsFacadeSrv.closeClienteSelector()
  }

  iniciarForm() {
    this.clienteForm = this.formBuilder.group({
      nombre: [null, Validators.required],
      rut: null,
      direccion: null,
      telefono: null,
      email: null
    })
    this.clienteNombreControl = this.clienteForm.get('nombre');

  }

  mostrarModal() {
    this.opened = true;
    this.cliFacadeSrv.loadItems();
  }

  ocultarModal() {
    this.opened = false;
    this.filter = null;
    if (this.isEditing)
      this.descartarCambios();
  }

  conectarConStore() {
    this.cliFacadeSrv.temp$.pipe(takeWhile(val => val != null), first()).subscribe(item => this.clienteForm.patchValue(item))
    this.formSubscription = this.clienteForm.valueChanges.subscribe(val => {
      this.cliFacadeSrv.formChanged(val)
    })
  }

  desconectarDeStore() {
    this.formSubscription ? this.formSubscription.unsubscribe() : null;
    this.clienteForm.reset()
  }

}
