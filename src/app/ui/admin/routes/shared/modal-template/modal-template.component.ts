import { Component, OnInit, Input, ContentChild, TemplateRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-template',
  templateUrl: './modal-template.component.html',
  styleUrls: ['./modal-template.component.scss'],
})
export class ModalTemplateComponent implements OnInit {

  @Input() modalTitle: string
  @Input() noPadding: boolean
  @Input() height: number = 70
  @ContentChild('modalBody', { static: false }) body: TemplateRef<any>
  @ContentChild('modalFooter', { static: false }) footer: TemplateRef<any>

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.noPadding = this.noPadding !== undefined
  }

  close() {
    this.activeModal.close()
  }
}
