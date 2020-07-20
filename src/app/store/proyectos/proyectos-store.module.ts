import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProyectosStoreEffects } from './effects';
import { proyectosReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('proyectos', proyectosReducer),
    EffectsModule.forFeature([ProyectosStoreEffects])
  ],
  providers: [ProyectosStoreEffects]
})
export class ProyectosStoreModule {}