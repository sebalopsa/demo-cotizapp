import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    }
  ]
})
export class DatepickerComponent implements ControlValueAccessor {
  @Input() size: string = 'md';
  @Input() disabled?: boolean;
  @Input() minDate?: number;
  @Input() maxDate?: number;

  constructor(
    private ngbDateParser: NgbDateParserFormatter
  ) {
    this.minDate = this.minDate || 1514818800000;
    this.maxDate = this.maxDate || 2556111600000;
  }

  private _dateObj: any;

  OnChangefn = (_) => _;


  public get dateObj(): any {
    return this._dateObj;
  }

  public set dateObj(value: any) {
    this._dateObj = value;
  }

  onDateChange(evt) {
    if (evt)
      this.OnChangefn(this.dateObjToEpoch(evt));
    else
      this.OnChangefn(null);

  }

  dateObjToEpoch(dateObj) {
    const date = new Date(dateObj.year, dateObj.month - 1, dateObj.day, 12);
    return date.getTime();
  }

  epochToDateObj(epoch) {
    const date = new Date(epoch);
    date.setHours(12);
    return this.ngbDateParser.parse(date.toISOString())
  }

  writeValue(epoch: any): void {
    if (epoch)
      this.dateObj = this.epochToDateObj(epoch);
    else
      this.dateObj = null
  }

  registerOnChange(fn: any): void {
    this.OnChangefn = fn;
  }
  registerOnTouched(fn: any): void {

  }
  setDisabledState(isDisabled: boolean): void {

  }
}


