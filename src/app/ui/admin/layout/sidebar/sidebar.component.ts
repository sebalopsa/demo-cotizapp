import { Component, OnInit } from '@angular/core';
import { UiFacadeService } from 'src/app/store/ui/facade';
import { AuthFacadeService } from 'src/app/store/auth/facade';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  trabMenu;
  proyMenu;

  constructor(private uiFacadeSrv: UiFacadeService, private authFacadeSrv: AuthFacadeService) { }

  ngOnInit() {
  }

  toggleSidebar(){
    this.uiFacadeSrv.toggleSidebar()
  }

  toggleCollapse(){
    this.uiFacadeSrv.toggleCollapsed()
  }

  logout() {
    this.authFacadeSrv.logout()
  }

}
