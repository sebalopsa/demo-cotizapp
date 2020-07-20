import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Action } from '@ngrx/store';
import { AuthStoreModule } from './auth/auth-store.module';
import { NavigationStoreModule } from './navigation/navigation-store.module';
import { UiStoreModule } from './ui/ui-store.module';
import { CotizacionesStoreModule } from './cotizaciones/cotizaciones-store.module';
import { EeppStoreModule } from './eepp/eepp-store.module';
import { OoccStoreModule } from './oocc/oocc-store.module';
import { TrabajadoresStoreModule } from './trabajadores/trabajadores-store.module';
import { TrabajadoresDocumentosStoreModule } from './trabajadores-documentos/trabajadores-documentos-store.module';
import { ProyectosStoreModule } from './proyectos/proyectos-store.module'

import { NominasStoreModule } from './nominas/nominas-store.module';

import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { CustomSerializer } from './router-serializer';
import { RoccflexStoreModule } from './roccflex/roccflex-store.module'
import { ClientesStoreModule } from './clientes/clientes-store.module'
import { LogsStoreModule } from './logs/logs-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({
      router: routerReducer
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
    EffectsModule.forRoot([]),
    AuthStoreModule,
    NavigationStoreModule,
    UiStoreModule,


    CotizacionesStoreModule,
    EeppStoreModule,
    OoccStoreModule,
    TrabajadoresStoreModule,
    TrabajadoresDocumentosStoreModule,

    RoccflexStoreModule,
    ClientesStoreModule,
    NominasStoreModule,
    LogsStoreModule,

    ProyectosStoreModule

  ]
})
export class RootStoreModule { }
