import { Component, OnInit, ContentChild, TemplateRef, Input } from '@angular/core';

@Component({
  selector: 'card-template',
  templateUrl: './card-template.component.html',
  styleUrls: ['./card-template.component.scss']
})
export class CardTemplateComponent implements OnInit {

  @Input() cardTitle: string;
  @Input() height?: string;
  @Input() show?: boolean;
  @Input() gray?: boolean;
  @Input() noPadding?: boolean;
  @ContentChild('componentTemplate', { static: false }) templateRef: TemplateRef<any>;
  @ContentChild('btnTemplate', { static: false }) btnTemplateRef: TemplateRef<any>;

  hovered: boolean;

  constructor() {
  }

  ngOnInit() {
    this.noPadding = this.noPadding !== undefined;
    this.show = this.show !== undefined;
    this.gray = this.gray !== undefined;
  }

}
