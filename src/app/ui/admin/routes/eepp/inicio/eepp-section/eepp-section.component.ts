import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'eepp-section',
  templateUrl: './eepp-section.component.html',
  styleUrls: ['./eepp-section.component.css']
})
export class EeppSectionComponent implements OnInit {
  @Input() eepp;
  filter: string;
  constructor() { }

  ngOnInit() {
  }

}
