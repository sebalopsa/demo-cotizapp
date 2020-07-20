import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Components
import { LayoutComponent } from './layout/layout.component';
//Layout Component
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PdfViewModalComponent } from './layout/pdf-view-modal/pdf-view-modal.component';
import { ActivityComponent } from './layout/header/activity/activity.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    PdfViewModalComponent,
    LayoutComponent,
    ActivityComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PdfViewerModule,
    NgbModule
  ]
})
export class AdminModule { }
