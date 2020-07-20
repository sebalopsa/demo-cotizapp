import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { OoccStoreEffects } from './effects';
import { ooccReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('oocc', ooccReducer),
    EffectsModule.forFeature([OoccStoreEffects])
  ],
  providers: [OoccStoreEffects]
})
export class OoccStoreModule {}