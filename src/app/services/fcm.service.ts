import { Injectable } from '@angular/core';
import {
  Plugin,
  Capacitor
} from '@capacitor/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
//import { Push, PushObject, PushOptions } from '@awesome-cordova-plugins/push/ngx';


import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { UtilService } from "./util.service";
import { ApiService } from "./api.service";
import { Component, OnInit } from "@angular/core";
//const { PushNotifications } = Plugin;

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private router: Router, private platform: Platform, private api: ApiService,
    private util: UtilService) { }
  initPush() {
    //if (Capacitor.platform !== 'web') {
    if (this.platform.is("cordova")) {
      this.registerPush();
    }
  }

  private registerPush() {
   PushNotifications.requestPermissions().then(result => {
     if (result.receive === 'granted') {
       
       // Register with Apple / Google to receive push via APNS/FCM
       PushNotifications.register();
     } else {
       alert('registration2');
       // Show some error
     }
   });

   
   // On success, we should be able to receive notifications
   PushNotifications.addListener('registration',
     (token: Token) => {
       this.api.getDataWithToken("profile").subscribe(
         (res: any) => {
           if (res) {
             // get FCM token
             let fcm_update: any = {};
             fcm_update.token = token.value;
             fcm_update.user_id = res.id;
             this.api.postDataWithToken("updateFCMToken", fcm_update).subscribe((res: any) => {
              // alert('Push registration success, token: ' + token.value);
             }, error => {
              alert(error)
             });
           }
         },
         (err) => {
         }
       );
     }
   );

   // Some issue with our setup and push will not work
   PushNotifications.addListener('registrationError',
     (error: any) => {
       //alert('Error on registration: ' + JSON.stringify(error));
     }
   );
   // Show us the notification payload if the app is open on our device
   PushNotifications.addListener('pushNotificationReceived',
     (notification: PushNotificationSchema) => {
       //alert('Push received: ' + JSON.stringify(notification));
     }
   );

   // Method called when tapping on a notification
   PushNotifications.addListener('pushNotificationActionPerformed',
     (notification: ActionPerformed) => {
      // alert('Push action performed: ' + JSON.stringify(notification));
      const data = notification.notification.data;
        //console.log('Action performed: ' + JSON.stringify(notification.notification));
        if (data) {
          //this.router.navigateByUrl(`/home/${data.detailsId}`);
          //alert('Push action performed: ' + JSON.stringify(data));
          this.router.navigateByUrl("tabs/appointment");
          
        }
     }
   );

  /* PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: PushNotificationActionPerformed) => {
        const data = notification.notification.data;
        console.log('Action performed: ' + JSON.stringify(notification.notification));
        if (data.detailsId) {
          this.router.navigateByUrl(`/home/${data.detailsId}`);
        }
      }
    );*/
  }
}
