import { Component, OnInit } from '@angular/core';
import { UiFacadeService } from 'src/app/store/ui/facade';
import { AuthFacadeService } from 'src/app/store/auth/facade';
import { Observable } from 'rxjs'
import { User } from 'src/app/models';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user$: Observable<User>
  sidebar$: Observable<boolean>;
  collapsed$: Observable<boolean>;
  testing: boolean;

  constructor(private uiFacadeSrv: UiFacadeService, private authFacadeSrv: AuthFacadeService) { }

  ngOnInit() {
    this.testing = environment['name'] == 'test';
    this.user$ = this.authFacadeSrv.user$;
    this.sidebar$ = this.uiFacadeSrv.sidebar$
    this.collapsed$ = this.uiFacadeSrv.collapsed$
  }

  logout() {
    this.authFacadeSrv.logout()
  }

  toggleSidebar() {
    this.uiFacadeSrv.toggleSidebar()
  }

  toggleCollapsed() {
    this.uiFacadeSrv.toggleCollapsed()
  }

}
