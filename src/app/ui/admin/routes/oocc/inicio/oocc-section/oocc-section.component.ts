import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'oocc-section',
  templateUrl: './oocc-section.component.html',
  styleUrls: ['./oocc-section.component.css']
})
export class OoccSectionComponent implements OnInit {
  @Input() oocc;
  filter: string;

  constructor() { }

  ngOnInit() {
  }

}
