import { ApiService } from "./services/api.service";
import { Component, ViewChildren, QueryList } from "@angular/core";
import {SplashScreen} from '@capacitor/splash-screen';
//import { FCM } from '@awesome-cordova-plugins/fcm/ngx';
import { FcmService } from './services/fcm.service';

import {
  Platform,
  NavController,
  ToastController,
  IonRouterOutlet,
  isPlatform,
} from "@ionic/angular";
//import { SplashScreen } from "@awesome-cordova-plugins/splash-screen/ngx";
import { StatusBar } from "@awesome-cordova-plugins/status-bar/ngx";
import { Router } from "@angular/router";
//import { OneSignal } from "@awesome-cordova-plugins/onesignal/ngx";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  constructor(
    //private fcm: FCM,
    private platform: Platform,
    //private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private api: ApiService,
    private router: Router,
    //private oneSignal: OneSignal,
    private navCtrl: NavController,
    private toastController: ToastController,
    private fcmService: FcmService
  ) {

    this.initializeApp();
    
    //localStorage.setItem("intro",'false')
    if (localStorage.getItem("intro")=="true") {
     
    if (localStorage.getItem("token")) {
      this.navCtrl.navigateRoot("/tabs/home");
    } else {
      this.navCtrl.navigateRoot("/tabs/home");

     //this.navCtrl.navigateRoot("signin");
    }
  } else {
    this.navCtrl.navigateRoot("/intro");
  }
this.statusBar.backgroundColorByHexString("#007265");
   this.backButtonEvent();
  }

  initializeApp() {
   // SplashScreen.show();
    
    this.platform.ready().then(() => {
      //this.splashScreen.show();
      this.statusBar.overlaysWebView(false);
     //this.statusBar.backgroundColorByHexString("#ab0048");
    //  this.statusBar.hide();
     // this.statusBar.hide();
     //this.statusBar.styleDefault();
/*if(isPlatform("android")){
  this.statusBar.overlaysWebView(false);
  this.statusBar.backgroundColorByHexString("#ab0048");
   //this.statusBar.styleDefault();
}*/
    
//SplashScreen.hide();
   /*    
      setTimeout(() => {
       this.api.getData("noti/setting").subscribe(
          (res: any) => {
            if (res.success) {
              //console.log(res.data);
              if (this.platform.is("cordova")) {
                this.oneSignal.startInit(
                  res.data.APP_ID,
                  res.data.PROJECT_NUMBER
                );
                this.oneSignal
                  .getIds()
                  .then((ids) => {(this.api.deviceToken = ids.userId)
                    console.log(ids+'*****');});
                this.oneSignal.endInit();
              } else {
                console.log('*****');
                this.api.deviceToken = null;
              }
            }
          },
          (err) => {}
        );
        
      }, 500);*/
    });

   // Trigger the push setup 
   //this.fcmService.initPush();

  }
  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        } else if (
          this.router.url === "/tabs/home" ||
          this.router.url === "/tabs/appointment" ||
          this.router.url === "/tabs/profile" ||
          this.router.url === "/signin" ||
          this.router.url === "/signup-option"
        ) {
          if (
            new Date().getTime() - this.lastTimeBackPress <
            this.timePeriodToExit
          ) {
            navigator["app"].exitApp();
          } else {
            this.showToast();
            this.lastTimeBackPress = new Date().getTime();
          }
        }
      });
    });
  }
  async showToast() {
    var mss='';
    if (localStorage.getItem("Language") == "En") {
      mss='press back again to exit App.';
    } else {
      mss='اضغط مرة أخرى للخروج من التطبيق.';
    }

    const toast = await this.toastController.create({
      message: mss,
      duration: 2000,
      cssClass: "leaveToast",
    });
    toast.present();
  }
}
