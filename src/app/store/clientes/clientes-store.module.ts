import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ClientesStoreEffects } from './effects';
import { clientesReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('clientes', clientesReducer),
    EffectsModule.forFeature([ClientesStoreEffects])
  ],
  providers: [ClientesStoreEffects]
})
export class ClientesStoreModule {}