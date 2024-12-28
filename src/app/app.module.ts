import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';
import { SignatureComponent } from './components/signature/signature.component';
// Import the library
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent, SignatureComponent],
  entryComponents: [SignatureComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AngularSignaturePadModule, AppRoutingModule, IonicStorageModule.forRoot(),
    HttpClientModule,

    ReactiveFormsModule, // Para trabalhar com Reactive Forms Rapha
    FormsModule,],
  providers: [
    InAppBrowser, ScreenOrientation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'pt-BR' }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
