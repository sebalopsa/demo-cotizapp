import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { TrabajadoresFacadeService } from 'src/app/store/trabajadores/facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css']
})
export class TrabajadoresComponent implements OnInit {
  loading$: Observable<boolean>
  constructor(
    private trabFacadeSrv: TrabajadoresFacadeService,
    private cd: ChangeDetectorRef
  ) {
   }

  ngOnInit() {
    this.loading$ = this.trabFacadeSrv.loading$;
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

}
