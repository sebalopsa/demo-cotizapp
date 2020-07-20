import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NominasStoreEffects } from './effects';
import { nominasReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('nominas', nominasReducer),
    EffectsModule.forFeature([NominasStoreEffects])
  ],
  providers: [NominasStoreEffects]
})
export class NominasStoreModule {}