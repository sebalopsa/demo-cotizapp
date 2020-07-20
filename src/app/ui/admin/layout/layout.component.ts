import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UiFacadeService } from 'src/app/store/ui/facade';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  sidebar$: Observable<boolean>;
  collapsed$: Observable<boolean>;
  modal$: Observable<string>;
  sidebar
  constructor(private uiFacadeSrv: UiFacadeService) {
  }

  ngOnInit() {
    this.modal$ = this.uiFacadeSrv.modal$;
    this.sidebar$ = this.uiFacadeSrv.sidebar$;
    this.collapsed$ = this.uiFacadeSrv.collapsed$;

    this.sidebar$.subscribe(val=>this.sidebar=val)
  }

  toggleSidebar() {
    this.uiFacadeSrv.toggleSidebar();
  }

  cerrarModal(){
    this.uiFacadeSrv.closeModal();
  }
}
