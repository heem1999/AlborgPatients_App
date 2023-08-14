import { ApiService } from "./../../services/api.service";
import { UtilService } from "./../../services/util.service";
import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";
import { SplashScreen } from "@capacitor/splash-screen";
import { SmsRetriever } from "@awesome-cordova-plugins/sms-retriever/ngx";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.page.html",
  styleUrls: ["./signin.page.scss"],
})
export class SigninPage implements OnInit {
  data: any = {};
  err: any = {};
  lang;
  currentSystemLan
  showpassword = false;
  constructor(
    private smsRetriever: SmsRetriever,
    private router: Router,
    private navCtrl: NavController,
    private util: UtilService,
    private translate: TranslateService,
    private api: ApiService
  ) {

    SplashScreen.hide();
   this.currentSystemLan = localStorage.getItem("Language");
    if (this.currentSystemLan == "En") {
    this.translate.use('en');
      this.lang = 'ع';
    } else {
     this.translate.use('ar');
      this.lang = 'En';
    }

    this.smsRetriever.getAppHash()
    .then((res: any) => console.log(res))
    .catch((error: any) => console.error(error));
  }

  ngOnInit() {
   
    /*var currentSystemLan = localStorage.getItem("Language");
    if (currentSystemLan == "En") {
    this.translate.use('en');
      this.lang = 'ع';
    } else {
     this.translate.use('ar');
      this.lang = 'En';
    }*/
  }

  
  changeLang() {
    if (localStorage.getItem("Language") == "En") {
      localStorage.setItem("Language", "ع");
      this.translate.use('en');
      this.lang = "En";
    } else {
      localStorage.setItem("Language", "En");
      this.translate.use('ar');
      this.lang = "ع";
    }
   SplashScreen.show();
      window.location.reload();
      

  }

  doForgot() {
    this.navCtrl.navigateForward("/forgot-password");
  }

  // doSignIn() {
  //   console.log("kk");
  //   //return;
  //   localStorage.setItem("isLogin", "true");
  //   this.navCtrl.navigateForward("/phone-number");
  // }
  doSignIn() {
    
    this.data.device_token = this.api.deviceToken;
    this.util.startLoad();
    this.api.postData("login", this.data).subscribe(
      (res: any) => {
        if (res.success) {
          this.api.new_login=true;
          localStorage.setItem("isLogin", "true");
          this.util.dismissLoader();
          this.err = "";
          if(localStorage.getItem("Language")=="En"){
            this.util.presentToast(res.msg);
          }else{
            this.util.presentToast(res.msg_ar);
          }

          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            this.api.userToken = res.data.token;
            this.api.new_login=true;
           // this.router.navigate('');
            this.navCtrl.navigateRoot("");
            
          } else {
          }
        } else {
          this.util.dismissLoader();
          this.err = "";
          if(localStorage.getItem("Language")=="En"){
            this.util.presentToast(res.msg);
          }else{
            this.util.presentToast(res.msg_ar);
          }
        }
      },
      (err) => {
        this.util.dismissLoader();
        this.err = err.error.errors;
      }
    );
  }

  doSignUp() {
    this.navCtrl.navigateForward("/signup");
  }

  goHome() {
    this.router.navigateByUrl('');
    //this.navCtrl.navigateRoot("");
  }

  togelPassword() {
    if(this.showpassword){
      this.showpassword=false;
    }else{
      this.showpassword=true;
    }
  }

}
