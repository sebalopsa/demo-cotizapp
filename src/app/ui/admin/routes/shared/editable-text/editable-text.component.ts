import { Component, OnInit, OnChanges, ChangeDetectionStrategy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditableTextComponent implements OnInit, OnChanges {
  @Input() value: string;
  @Input() size?= 'md';
  @Output() save = new EventEmitter<any>();

  form: FormGroup;
  get input() {
    return this.form.get('input');
  }

  boxWidth: number;
  get auxDiv() {
    return document.getElementById('auxDiv');
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.form)
      this.input.setValue(this.value);
  }
  buildForm() {
    this.form = this.fb.group({
      input: this.value
    })
    this.changeInputWidth(this.value);

    this.input.valueChanges.subscribe(v => {
      this.changeInputWidth(v);
    }

    )
  }

  changeInputWidth(text) {
    this.auxDiv.innerText = text;
    this.boxWidth = this.auxDiv.clientWidth;
  }

  onFocusOut() {
    if (this.input.value != this.value) {
      this.save.emit(this.input.value)
    }
  }

}
