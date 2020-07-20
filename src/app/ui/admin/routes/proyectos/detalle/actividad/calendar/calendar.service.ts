import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { ActividadService } from '../actividad.service';
import { INIT_OPTIONS } from './calendar-options';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class CalendarService {

  private readonly _selectedMonth = new BehaviorSubject<{ year, month }>({ year: 2020, month: 1 })

  readonly selectedMonth$ = this._selectedMonth.asObservable()

  get selectedMonth() {
    return this._selectedMonth.getValue()
  }

  set selectedMonth(value) {
    this._selectedMonth.next(value);
  }

  constructor(private srv: ActividadService) {
  }

  initOptions() {
    return INIT_OPTIONS;
  }

  getData() {
    return this.selectedMonth$.pipe(
      mergeMap(date => this.srv.getJornadas().pipe(
        map(js => {
          return js
            .map(j => ({ fecha: this.formatDate(j.fecha), trabajadores: j.trabajadores.length }))
        }),
        map(items => this.generateMonthData(items))
      ))
    )
  }


  formatDate(epoch: number) {
    const date = new Date(epoch);
    return [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    ].join('-')
  }

  unformatDate(formatDate: string) {
    const [year, month, day] = formatDate.split('-').map(n => Number(n))
    const date = new Date(year, month - 1, day, 12);
    return date.getTime()
  }

  generateMonthData(jornadas: Item[]) {
    const { year, month } = this.selectedMonth;
    const totalDays = new Date(year, month, 0).getDate();
    let data = [];

    for (let day = 1; day <= totalDays; day++) {
      const epoch = new Date(year, month - 1, day).getTime();
      const nTrabs = jornadas.filter(j => j.fecha === this.formatDate(epoch))
        .map(j => j.trabajadores)
        .reduce((a, b) => a + b, 0);
      data.push([
        this.formatDate(epoch),
        nTrabs
      ]);
    }
    return data;
  }

  selectDate(date: number) {
    this.srv.setSelectedDate(date)
  }

}
export interface Item {
  fecha: string;
  trabajadores: number;
}