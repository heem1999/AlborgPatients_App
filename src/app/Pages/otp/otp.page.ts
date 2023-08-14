import { UtilService } from "./../../services/util.service";
import { ApiService } from "./../../services/api.service";
import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { IonInput, ModalController, NavController, NavParams } from "@ionic/angular";
//import { SmsRetriever } from '@awesome-cordova-plugins/sms-retriever/ngx';
import { SmsRetriever } from '@awesome-cordova-plugins/sms-retriever/ngx';

@Component({
  selector: "app-otp",
  templateUrl: "./otp.page.html",
  styleUrls: ["./otp.page.scss"],
})
export class OTPPage implements OnInit {
  @ViewChild('input')  inputElement: IonInput;
  @ViewChild("a", { static: true }) a;
  @ViewChild("b", { static: true }) b;
  @ViewChild("c", { static: true }) c;
  @ViewChild("d", { static: true }) d;
  data: any = {};
  otp: any = {};
  err: any = {};
  lan
  @Input() SignupPage_otp
  @Input() is_SignupPage
  @Input() SignupPage_data
  count=60;
  stop_time
  constructor(
    private smsRetriever: SmsRetriever,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private api: ApiService,
    private util: UtilService
  ) {
    this.lan = localStorage.getItem("Language");
    
    //this.is_SignupPage = localStorage.getItem("is_SignupPage-OTP");
    setTimeout(() => {
      //this.a.setFocus();
      this.inputElement.setFocus();
    }, 500);

   
  }

  ngOnInit() {
    /*this.smsRetriever.getAppHash()
    .then((res: any) => console.log(res))
    .catch((error: any) => console.error(error));*/

    
    
  }

  ionViewDidEnter() {
    this.smsRetriever.startWatching()
      .then((res: any) => {
        this.processSMS(res);
      })
      .catch((error: any) => console.error(error));
      
    this.stop_time=setInterval(() => {
      if(this.count==0){
        clearInterval(this.stop_time);
      }else{
        this.count--;
      }
      
     }, 1000);
     
     if(this.api.OTP_code){
      this.data.otp=this.api.OTP_code;
      this.doDone_OPT_sms()
      this.api.OTP_code=null;
     }

     if(this.api.OTP_code_fogot){
      this.data.otp=this.api.OTP_code;
      this.doDone();
      this.api.OTP_code_fogot=null;
     }

  }
  moveFocus(event, nextElement, previousElement) {
    if (event.keyCode == 8 && previousElement) {
      previousElement.setFocus();
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else {
      event.path[0].value = "";
    }
  }

  doDone() {
    
   // if(!this.data.otp){
      this.data.otp = this.otp.a + this.otp.b + this.otp.c + this.otp.d;
    //}
    this.data.type = 0;
    this.data.phone_no = this.api.phone_no;
    this.util.startLoad();
    this.api.postData("forgot/validate", this.data).subscribe(
      (res: any) => {
        if (res.success) {
          this.util.dismissLoader();
          if (localStorage.getItem("Language") == "En") {
            this.util.presentToast(res.msg);
          } else {
            this.util.presentToast(res.msg_ar);
          }
          localStorage.setItem("token", res.data.token);
          this.api.userToken = res.data.token;
          this.navCtrl.navigateForward("/set-new-password");
        } else {
          this.util.dismissLoader();
          if (localStorage.getItem("Language") == "En") {
            this.util.presentToast(res.msg);
          } else {
            this.util.presentToast(res.msg_ar);
          }
        }
      },
      (err) => {
        this.util.dismissLoader();
        this.err = err.error.errors;
        console.log(this.err)
      }
    );
  }

  send_OPT(){
    this.count=60;
    this.stop_time=setInterval(() => {
      if(this.count==0){
        clearInterval(this.stop_time);
      }else{
        this.count--;
      }
      
     }, 1000);

     if(this.is_SignupPage == 'true'){
      this.util.startLoad();
      this.api.postData("SignupPageOTP", this.SignupPage_data).subscribe(
        (res: any) => {
          if (res.success) {
            this.util.dismissLoader();
            if(localStorage.getItem("Language")=="En"){
              this.util.presentToast(res.msg);
            }else{
              this.util.presentToast(res.msg_ar);
            }
            this.SignupPage_otp=res.data.otp;
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
     }else{
      //this mean the user resend opt from forgot page
      this. send_OPT_forgotPASS();
     }
   

  }

  send_OPT_forgotPASS() {
    this.data.type = 0;
    this.data.phone_no =  this.api.phone_no;
    this.util.startLoad();
    this.api.postData("forgot", this.data).subscribe(
      
      (res: any) => {
        if (res.success) {
          this.util.dismissLoader();
          if(localStorage.getItem("Language")=="En"){
            this.util.presentToast(res.msg);
          }else{
            this.util.presentToast(res.msg_ar);
          }
         
          this.SignupPage_otp=res.data.otp;
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
      }
    );
  }

  doDone_OPT() {
    this.data.otp = this.otp.a + this.otp.b + this.otp.c + this.otp.d;
    if (this.SignupPage_otp == this.data.otp) {
      if (localStorage.getItem("Language") == "En") {
        this.util.presentToast('OTP is verified.');
      } else {
        this.util.presentToast('تم التحقق من OTP.');
      }
      this.modalCtrl.dismiss({
        'done': true
      });
    } else {
      if (localStorage.getItem("Language") == "En") {
        this.util.presentToast('Given OTP is invalid.');
      } else {
        this.util.presentToast('رمز التحقق غير صالح.');
      }
    }
  }

  doDone_OPT_sms() {
   // this.data.otp = this.otp.a + this.otp.b + this.otp.c + this.otp.d;
    if (this.SignupPage_otp == this.data.otp) {
      if (localStorage.getItem("Language") == "En") {
        this.util.presentToast('OTP is verified.');
      } else {
        this.util.presentToast('تم التحقق من OTP.');
      }
      this.modalCtrl.dismiss({
        'done': true
      });
    } else {
      if (localStorage.getItem("Language") == "En") {
        this.util.presentToast('Given OTP is invalid.');
      } else {
        this.util.presentToast('رمز التحقق غير صالح.');
      }
    }
  }

  closeModel(){
    this.modalCtrl.dismiss({
      'done': false
    });
  }

  

  processSMS(data) {
    const message = data.Message;
    if (message != -1) {
      this.data.otp = message.slice(0, 4);
      let otp = message.slice(0, 4);
      this.otp.a = otp.slice(0,0)
      this.otp.b = otp.slice(0,0)
      this.otp.c = otp.slice(0,0)
      this.otp.d= otp.slice(0,0)
      if(this.is_SignupPage == 'true'){
        this.doDone_OPT_sms();
      }else{
        this.doDone()
        
      }
      
    }
  }
}
