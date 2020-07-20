import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DocumentosService } from '../documentos.service';

@Injectable()
export class AgregarDocumentosService {
  public form: FormGroup;
  public docs: FormArray;
  public totalSize: number = 0;  //variable para mostrar el peso total en el boton Subir
  public uploading: boolean;


  constructor(
    private fb: FormBuilder,
    private docsSrv: DocumentosService
  ) { }

  construirForm() {
    this.form = this.fb.group({
      docs: this.fb.array([])
    });
    this.docs = this.form.get('docs') as FormArray;
    this.docs.valueChanges.subscribe(val => this.totalSize = sumarPeso(val))

    function sumarPeso(array: any[]) {
      return array.length ? array.map(el => el.peso).reduce((a, b) => a + b) : 0;
    }
  }

  limpiarForm() {
    this.form.reset();
  }

  agregarDocumento(file) {
    this.docs.push(
      this.fb.group({
        nombre: [quitarExtension(file.name), Validators.required],
        fileName: [file.name, Validators.required],
        vencimiento: this.fb.group({
          activo: false,
          fechaObj: null,
          fechaEpoch: null,
        }),
        file: file,
        tipo: file.type,
        peso: file.size
      })
    )

    function quitarExtension(string) {
      return string.split('.').slice(0, -1).join('.')
    }
  }

  quitarDocumento(i) {
    this.docs.removeAt(this.docs.length - i - 1) // Debido a que se presentan invertidos
  }

  clickSubir(proyecto) {
    this.uploading = true;
    return this.docsSrv.subirDocumentos(proyecto, this.docs.value)
      .then(() => {
        this.uploading = false
      })
      .catch(() => this.uploading = false)
  }

}
