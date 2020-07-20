import { Component, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [CalendarService]
})
export class CalendarComponent implements OnInit {
  options;
  mergeOptions;
  months = [];
  formatMonth = ({ year, month }) => year + '-' + month;
  isThisYear = (year) => new Date().getFullYear() === year;
  isThisMonth = ({ year, month }) => this.isThisYear(year) && new Date().getMonth() + 1 === month;



  constructor(private srv: CalendarService) {
    const today = new Date();
    for (let y = 2019; y <= today.getFullYear(); y++) {
      for (let m = 1; m <= (this.isThisYear(y) ? today.getMonth() + 1 : 12); m++) {
        this.months.push({
          year: y,
          month: m
        });
      }
    }
    this.srv.selectedMonth = this.months[this.months.length - 1];
  }

  ngOnInit() {
    this.options = this.srv.initOptions()
    this.srv.getData().subscribe(data => this.updateData(data))
  }


  onClick(evt) {
    this.srv.selectDate(this.srv.unformatDate(evt.data[0]));
  }

  updateData(data) {
    this.mergeOptions = {
      calendar: [{
        range: this.formatMonth(this.srv.selectedMonth)
      }],
      visualMap: {
        max: _.max(data.map(el => el[1])) || 10
      },
      series: [{
        data
      }, {
        data
      }]
    }

  }

  changeMonth(event) {
    const value = event.target.value as string;
    const [year, month] = value.split('-')
    this.srv.selectedMonth = { year, month }
  }




} 
