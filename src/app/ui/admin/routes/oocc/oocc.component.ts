import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { OoccFacadeService } from 'src/app/store/oocc/facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'oocc',
  templateUrl: './oocc.component.html',
  styleUrls: ['./oocc.component.css']
})
export class OoccComponent implements OnInit {
  loading$: Observable<boolean>
  constructor(
    private ocFacadeSrv: OoccFacadeService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.loading$ = this.ocFacadeSrv.loading$;
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

}
