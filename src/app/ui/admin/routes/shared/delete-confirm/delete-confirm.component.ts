import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {
  @Input() mensaje = '¿Está seguro que desea eliminar este documento?';
  @Output() clickConfirm: EventEmitter<any> = new EventEmitter();

  constructor(private activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
  }
  close() {
    this.activeModal.close()
  }
  confirm() {
    this.clickConfirm.emit()
    this.close()
  }

}
