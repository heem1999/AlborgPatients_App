import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
//import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@awesome-cordova-plugins/status-bar/ngx";
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule,HttpClient } from "@angular/common/http";
//import { OneSignal } from "@awesome-cordova-plugins/onesignal/ngx";
//import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
//import { PayPal } from "@ionic-native/paypal/ngx";
//import { Camera } from "@ionic-native/camera/ngx";
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
//import { FCM } from '@awesome-cordova-plugins/fcm/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

//import { Geolocation } from "@ionic-native/geolocation/ngx";
//import {NativeGeocoder,NativeGeocoderResult,NativeGeocoderOptions,} from "@ionic-native/native-geocoder/ngx";
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';

import { Stripe } from '@awesome-cordova-plugins/stripe/ngx';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { registerLocaleData } from '@angular/common';
import localeAR from '@angular/common/locales/ar';
import localeEN from '@angular/common/locales/en';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SmsRetriever } from '@awesome-cordova-plugins/sms-retriever/ngx';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
  }
  registerLocaleData(localeAR, 'AR');
  registerLocaleData(localeEN, 'EN');
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot({
      rippleEffect: false,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    SmsRetriever,
    InAppBrowser,
    Network,
   // FCM,
    Clipboard,
    StatusBar,
    SplashScreen,
    //PayPal,
    Stripe,
    Camera,
    Geolocation,
    NativeGeocoder,
    //OneSignal,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
