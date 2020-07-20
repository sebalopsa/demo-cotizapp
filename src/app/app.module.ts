import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { UiModule } from './ui/ui.module';

//NGRX
import { RootStoreModule } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


//FIRESTORE 
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
const FIRESTORE_SETTINGS_PROVIDERS = [
  { provide: FirestoreSettingsToken, useValue: {} }
]

// LOCALE SETTINGS
import { LOCALE_ID } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeCL from '@angular/common/locales/es-CL';
registerLocaleData(localeCL, 'es-CL');
const LOCALE_PROVIDERS = [
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  { provide: LOCALE_ID, useValue: "es-CL" }
]

//STARTUP SERVICE
import { StartupService } from './services/startup.service';
export function StartupServiceFactory(startupService: StartupService): Function {
  return () => startupService.checkAuthState();
}
const APPINIT_PROVIDERS = [
  StartupService,
  { provide: APP_INITIALIZER, useFactory: StartupServiceFactory, deps: [StartupService], multi: true, },
];

// PIPES
import { RutPipe } from 'ng2-rut';
import { DecimalPipe, DatePipe } from '@angular/common';

const PIPES_PROVIDERS = [
  RutPipe,
  DecimalPipe,
  DatePipe
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    RootStoreModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    UiModule,
  ],
  providers: [
    ...LOCALE_PROVIDERS,
    ...FIRESTORE_SETTINGS_PROVIDERS,
    ...APPINIT_PROVIDERS,
    ...PIPES_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
