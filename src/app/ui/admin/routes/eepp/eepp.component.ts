import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { EeppFacadeService } from 'src/app/store/eepp/facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'eepp',
  templateUrl: './eepp.component.html',
  styleUrls: ['./eepp.component.css']
})
export class EeppComponent implements OnInit {
  loading$: Observable<boolean>
  constructor(
    private epFacadeSrv: EeppFacadeService,
    private cd: ChangeDetectorRef
  ) {
   }

  ngOnInit() {
    this.loading$ = this.epFacadeSrv.loading$;
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

}
