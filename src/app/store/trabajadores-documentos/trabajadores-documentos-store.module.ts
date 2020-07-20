import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TrabajadoresDocumentosStoreEffects } from './effects';
import { trabajadoresDocumentosReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('trabajadoresDocumentos', trabajadoresDocumentosReducer),
    EffectsModule.forFeature([TrabajadoresDocumentosStoreEffects])
  ],
  providers: [TrabajadoresDocumentosStoreEffects]
})
export class TrabajadoresDocumentosStoreModule {}