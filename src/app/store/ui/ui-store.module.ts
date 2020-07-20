import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { uiReducer } from './reducer';
import { UiStoreEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('ui', uiReducer),
    EffectsModule.forFeature([UiStoreEffects])
  ],
  providers: [UiStoreEffects]
})
export class UiStoreModule { }