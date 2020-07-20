import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CotizacionesStoreEffects } from './effects';
import { cotizacionesReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('cotizaciones', cotizacionesReducer),
    EffectsModule.forFeature([CotizacionesStoreEffects])
  ],
  providers: [CotizacionesStoreEffects]
})
export class CotizacionesStoreModule {}