import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() searchText: string;
  @Output() searchTextChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  textChanged(event) {
    this.searchTextChange.emit(event);
  }

}
