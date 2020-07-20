import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2Rut } from 'ng2-rut';
import { FileSizeModule } from 'ngx-filesize';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxImageCompressService } from 'ngx-image-compress';
import { NgxEchartsModule } from 'ngx-echarts';

//Components
import { SelectClienteModalComponent } from './select-cliente-modal/select-cliente-modal.component';
import { SearchComponent } from './search/search.component';
import { BtnCardComponent } from './btn-card/btn-card.component';
import { StatTotalComponent } from './stat-total/stat-total.component';
import { StatThisMonthComponent } from './stat-this-month/stat-this-month.component';
import { StatAverageComponent } from './stat-average/stat-average.component';
import { StatCardComponent } from './stat-card/stat-card.component';
import { DevPanelComponent } from './dev-panel/dev-panel.component';
import { InstalacionesComponent } from '../proyectos/detalle/instalaciones/instalaciones.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { CardTemplateComponent } from './card-template/card-template.component';
import { InputComponent } from './input/input.component';
import { EditableTextComponent } from './editable-text/editable-text.component';
import { ModalTemplateComponent } from './modal-template/modal-template.component';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';

@NgModule({
  declarations: [
    SelectClienteModalComponent,
    SearchComponent,
    BtnCardComponent,
    StatTotalComponent,
    StatThisMonthComponent,
    StatAverageComponent,
    StatCardComponent,
    DevPanelComponent,
    InstalacionesComponent,
    DatepickerComponent,
    CardTemplateComponent,
    InputComponent,
    EditableTextComponent,
    ModalTemplateComponent,
    DeleteConfirmComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    Ng2Rut,
    FileSizeModule,
    NgbModule,
    NgxEchartsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    Ng2Rut,
    SelectClienteModalComponent,
    SearchComponent,
    BtnCardComponent,
    StatTotalComponent,
    StatThisMonthComponent,
    StatAverageComponent,
    StatCardComponent,
    FileSizeModule,
    DevPanelComponent,
    InstalacionesComponent,
    NgbModule,
    DatepickerComponent,
    CardTemplateComponent,
    NgxEchartsModule,
    ModalTemplateComponent,
    InputComponent,
    EditableTextComponent,
    DeleteConfirmComponent
  ],
  providers: [
    NgxImageCompressService
  ],
  entryComponents: [
    DeleteConfirmComponent

  ]
})
export class SharedModule { }
