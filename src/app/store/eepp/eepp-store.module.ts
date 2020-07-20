import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EeppStoreEffects } from './effects';
import { eeppReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('eepp', eeppReducer),
    EffectsModule.forFeature([EeppStoreEffects])
  ],
  providers: [EeppStoreEffects]
})
export class EeppStoreModule {}