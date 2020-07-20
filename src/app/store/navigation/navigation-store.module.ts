import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NavigationStoreEffects } from './effects';
// import { authReducer } from './reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // StoreModule.forFeature('navigation'),
    EffectsModule.forFeature([NavigationStoreEffects])
  ],
  providers: [NavigationStoreEffects]
})
export class NavigationStoreModule { }
