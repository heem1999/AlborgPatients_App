import { UtilService } from "./../../services/util.service";
import { ApiService } from "./../../services/api.service";
import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-set-new-password",
  templateUrl: "./set-new-password.page.html",
  styleUrls: ["./set-new-password.page.scss"],
})
export class SetNewPasswordPage implements OnInit {
  data: any = {};
  err: any = {};
  showpassword = false;
  cshowpassword = false;
  lan
  constructor(
    private navCtrl: NavController,
    private api: ApiService,
    private util: UtilService
  ) {
    this.lan = localStorage.getItem("Language");
  }

  ngOnInit() {}

  doChange() {
    this.util.startLoad();
    this.api.postDataWithToken("newpassword", this.data).subscribe(
      (res: any) => {
        if (res.success) {
          this.util.dismissLoader();
        localStorage.setItem("isLogin", "true");
          this.util.presentToast(res.msg);
          this.navCtrl.navigateRoot("/tabs/home");
        }
      },
      (err) => {
        this.util.dismissLoader();
        this.err = err.error.errors;
        //this.util.presentToast(this.err.password[0]);
        if(localStorage.getItem("Language")=="En"){
          this.util.presentToast('The given data was invalid.');
        }else{
          this.util.presentToast('البيانات المقدمة غير صالحة.');
        }

        if(this.err?.password){
          var x=[];
          err.error.errors.password.forEach(element => {
            x.push(JSON.parse(element));
          });
         
          this.err.password = x;
          
        }
        if(this.err?.password_confirmation){
         // this.err.password_confirmation = JSON.parse(err.error.errors.password_confirmation);
        }

      }
    );
    // this.navCtrl.navigateRoot('/signin');
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

}
