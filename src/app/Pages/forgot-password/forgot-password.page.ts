import { UtilService } from "./../../services/util.service";
import { ApiService } from "./../../services/api.service";
import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { SmsRetriever } from "@awesome-cordova-plugins/sms-retriever/ngx";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.page.html",
  styleUrls: ["./forgot-password.page.scss"],
})
export class ForgotPasswordPage implements OnInit {
  data: any = {};
  err: any = {};
  lan
  constructor(
    private smsRetriever: SmsRetriever,
    private navCtrl: NavController,
    private api: ApiService,
    private util: UtilService
  ) {
    this.smsRetriever.getAppHash()
    .then((res: any) => console.log(res))
    .catch((error: any) => console.error(error));
    
    this.smsRetriever.startWatching()
    .then((res: any) => {
      const message = res.Message;
    if (message != -1) {
      console.log(message);
      this.api.OTP_code_fogot = message.slice(0, 4);
      console.log(this.api.OTP_code_fogot);
    }
    })
    
    this.lan = localStorage.getItem("Language");
  }

  ngOnInit() {
   
   

  }

  doNext() {
    this.data.type = 0;
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
          this.api.phone_no = this.data.phone_no;
          this.navCtrl.navigateForward("/otp");
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
}
