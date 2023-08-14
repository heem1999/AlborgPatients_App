import { UtilService } from "./../../services/util.service";
import { ApiService } from "./../../services/api.service";
import { Component, OnInit } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import { TranslateService } from '@ngx-translate/core';
import { OTPPage } from "../otp/otp.page";
import { Router } from "@angular/router";
import { SplashScreen } from "@capacitor/splash-screen";
import { SmsRetriever } from "@awesome-cordova-plugins/sms-retriever/ngx";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit {
  customOptions: any = {
    header: "Country Code",
  };
  data: any = {};
  err: any = {};
  showpassword = false;
  cshowpassword= false;
  agree_terms= false;
  sex='Male';
  lan;
  lang;
  constructor(
    private smsRetriever: SmsRetriever,
    private router: Router,
    private modalCtrl: ModalController,
    private translate: TranslateService,
    private navCtrl: NavController,
    private api: ApiService,
    private util: UtilService
  ) {
    this.lan=localStorage.getItem("Language");
    let currentSystemLan = localStorage.getItem("Language");
    if (currentSystemLan == "En") {
    this.translate.use('en');
      this.lang = 'ع';
    } else {
     this.translate.use('ar');
      this.lang = 'En';
    }

    this.smsRetriever.getAppHash()
    .then((res: any) => console.log(res))
    .catch((error: any) => console.error(error));
    
    this.smsRetriever.startWatching()
    .then((res: any) => {
      const message = res.Message;
    if (message != -1) {
      console.log(message);
      this.api.OTP_code = message.slice(0, 4);
      console.log(this.api.OTP_code);
    }
    });

  }

  ngOnInit() {
    
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
   // setTimeout(() => {
    SplashScreen.show();
      window.location.reload();
      
   // }, 1000);

  }

  async showOTP(otp) {
    localStorage.setItem("is_SignupPage-OTP", "true");
    const modal = await this.modalCtrl.create({
      component: OTPPage,
      componentProps: { 
        SignupPage_otp: otp,
        is_SignupPage:"true",
        SignupPage_data:this.data
      },
      backdropDismiss: false,
    // cssClass: "success-modal",
    });
     await modal.present();
     const { data } = await modal.onDidDismiss();
     if (data.done) {
      this.doSignUp(); //register the user
     }
  }

  SignupPageOTP() {
    this.data.type = 0;
    this.util.startLoad();
    this.api.postData("SignupPageOTP", this.data).subscribe(
      (res: any) => {
        if (res.success) {
          this.util.dismissLoader();
          if(localStorage.getItem("Language")=="En"){
            this.util.presentToast(res.msg);
          }else{
            this.util.presentToast(res.msg_ar);
          }
          this.showOTP(res.data.otp);
        } else {
          this.util.dismissLoader();
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
        if(this.err?.password){
          this.err.password = JSON.parse(err.error.errors.password);
        }
        if(this.err?.phone_no){
          this.err.phone_no = JSON.parse(err.error.errors.phone_no);
        }
      }
    );
  }

  doSignUp() {
    localStorage.setItem("isLogin", "true");
    this.data.device_token = this.api.deviceToken;
    this.data.sex = this.sex;
    this.util.startLoad();
    this.api.postData("register", this.data).subscribe(
      (res: any) => {
        if (res.success) {
          this.util.dismissLoader();
          this.util.presentToast(res.msg);
          if (res.data.token) {
            this.api.new_login=true;
            this.router.navigateByUrl('');
           // this.navCtrl.navigateRoot("/tabs/home");
            localStorage.setItem("token", res.data.token);
            this.api.userToken = res.data.token;
          } else {
            /*if (res.flow == "verification") {
              this.api.verifyMo = this.data.phone_no;
              this.navCtrl.navigateForward("/phone-number");
            }*/
          }
        }
      },
      (err) => {
        this.util.dismissLoader();
        this.err = err.error.errors;
      }
    );
  }

  doSignIn() {
    this.navCtrl.navigateForward("/signin");
  }

  viewprivacyPage() {
    this.navCtrl.navigateForward('/privacy-policy');
  }
  

  goHome() {
    this.router.navigateByUrl('');
  }

  togelPassword() {
    if(this.showpassword){
      this.showpassword=false;
    }else{
      this.showpassword=true;
    }
  }

  togelPassword2() {
    if(this.cshowpassword){
      this.cshowpassword=false;
    }else{
      this.cshowpassword=true;
    }
  }

  sexType(x){
    this.sex=x;
  }
}
