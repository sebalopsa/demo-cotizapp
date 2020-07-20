import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() control: AbstractControl;
  @Input() type?: string;
  @Input() minDate?: number;
  @Input() maxDate?: number;
  @Input() disabled?: boolean;

  @Output() clicked?= new EventEmitter<void>();

  constructor() {
    this.minDate = this.minDate || 1514818800000;
    this.maxDate = this.maxDate || 2556111600000;
    this.disabled = this.disabled !== undefined;

  }

  getControlParent(c: AbstractControl) {
    return c.parent as FormGroup;
  }

  getControlName(c: AbstractControl): string | null {
    const formGroup = c.parent.controls;
    return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
  }

  onClick() {
    this.clicked.emit();
  }

  clear(){
    this.control.reset();
  }

}
