import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TrabajadoresStoreEffects } from './effects';
import { trabajadoresReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('trabajadores', trabajadoresReducer),
    EffectsModule.forFeature([TrabajadoresStoreEffects])
  ],
  providers: [TrabajadoresStoreEffects]
})
export class TrabajadoresStoreModule {}