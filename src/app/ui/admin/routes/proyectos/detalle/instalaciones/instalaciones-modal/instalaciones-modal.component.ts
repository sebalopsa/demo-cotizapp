import { Component, OnInit, ViewChild, TemplateRef, ContentChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InstalacionesService, Instalacion } from '../instalaciones.service';
import { ProyectoService } from '../../proyecto.service';
import * as _ from 'lodash';
import { Proyecto } from '../../../proyectos.service';

@Component({
  selector: 'app-instalaciones-modal',
  templateUrl: './instalaciones-modal.component.html',
  styleUrls: ['./instalaciones-modal.component.css'],
  providers: [InstalacionesService, ProyectoService]
})
export class InstalacionesModalComponent implements OnInit {

  form: FormGroup
  indexEdit: number = -1
  registros: any
  materialInfo
  proyecto: Proyecto
  loading: boolean = true
  @ContentChild('template', { static: false }) temRef: TemplateRef<any>

  constructor(
    private srv: InstalacionesService,
    public modalSrv: NgbActiveModal,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm()
    this.srv.getItems(this.materialInfo.nombre, this.proyecto.id).subscribe(items => {
      this.registros = items
      this.loading = false
    })
  }

  close() {
    this.modalSrv.close()
  }

  editarRegistro(index, item?) {
    this.form.reset()
    this.indexEdit = index
    if(item)
      this.patchForm(item)
  }

  agregarRegistro() {
    console.log(this.registros.length)
    this.indexEdit = this.registros.length
    this.form.reset()
  }

  completarRegistro() {
    this.loading = true
    let value = this.form.value
    let item = { ...value, tipo: value.tipo.join('/'), material: this.materialInfo.nombre, proyecto: this.proyecto.id }
    if (this.indexEdit === this.registros.length) {
      this.srv.create(item)
    }
    else {
      let id = this.registros[this.indexEdit].id
      this.srv.edit(id, item)
    }
    this.indexEdit = -1
  }

  cancelarRegistro() {
    this.indexEdit = -1
  }

  eliminarRegistro(id) {
    this.srv.remove(id)
  }

  buildForm() {
    this.form = this.fb.group({
      fechaInicio: this.fb.control(null, Validators.required),
      fechaTermino: this.fb.control(null, Validators.required),
      cantidad: this.fb.control(0, Validators.required),
      tipo: this.fb.array([])
    })
    _.keys(this.materialInfo.tipo).forEach(t => {
      this.tipo.push(this.fb.control(null, Validators.required))
    })
  }

  patchForm(item) {
    let patch = { ...item, tipo: item.tipo.split('/') }
    this.form.patchValue(patch)
  }

  get fechaInicio() {
    return this.form.get('fechaInicio')
  }
  get fechaTermino() {
    return this.form.get('fechaTermino')
  }
  get cantidad() {
    return this.form.get('cantidad')
  }
  get tipo() {
    return this.form.get('tipo') as FormArray
  }

  getHoy(){
    return Date.now()
  }

  getKeys(object){
    return _.keys(object).length
  }

}
