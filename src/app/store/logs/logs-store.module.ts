import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LogsStoreEffects } from './effects';
import {logsReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('logs', logsReducer),
    EffectsModule.forFeature([LogsStoreEffects])
  ],
  providers: [LogsStoreEffects]
})
export class LogsStoreModule {}