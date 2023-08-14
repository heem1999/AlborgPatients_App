import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ModalController, NavParams, ToastController, AlertController, LoadingController } from '@ionic/angular';

//import { MapsAPILoader } from '@agm/core';
//import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
//import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
//import { Geolocation, GeolocationOptions, } from '@ionic-native/geolocation/ngx';
import { TranslateService } from '@ngx-translate/core';

declare var google: any;

@Component({
  selector: 'app-map-location',
  templateUrl: './map-location.page.html',
  styleUrls: ['./map-location.page.scss'],
})
export class MapLocationPage implements OnInit {
  @ViewChild('map', { read: ElementRef, static: true }) mapRef: ElementRef;
  map: any;
  bounds: any;

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    
  }

}
