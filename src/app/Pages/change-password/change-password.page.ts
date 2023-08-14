import { NavController } from "@ionic/angular";
import { UtilService } from "./../../services/util.service";
import { ApiService } from "./../../services/api.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.page.html",
  styleUrls: ["./change-password.page.scss"],
})
export class ChangePasswordPage implements OnInit {
  data: any = {};
  err: any = {};
  lan
  showpassword = false;
  cshowpassword = false;
  password = false;
  constructor(
    private api: ApiService,
    private util: UtilService,
    private navCtrl: NavController
  ) {
    this.lan = localStorage.getItem("Language");
  }

  ngOnInit() {}

  doChange() {
    
    this.util.startLoad();
    this.api.postDataWithToken("profile/password/update", this.data).subscribe(
      (res: any) => {
        if (res.success) {
          this.util.dismissLoader();
          this.err = "";
          if(localStorage.getItem("Language")=="En"){
            this.util.presentToast(res.msg);
          }else{
            this.util.presentToast(res.msg_ar);
          }
        } else {
          this.util.presentToast(res.message);
        }
      },
      (err) => {
        this.util.dismissLoader();
        if(localStorage.getItem("Language")=="En"){
          this.util.presentToast('The given data was invalid.');
        }else{
          this.util.presentToast('البيانات المقدمة غير صالحة.');
        }
        //this.util.presentToast(err.error.message);
        this.err = err.error.errors;
       
        if(this.err?.password){
          var x=[];
          err.error.errors.password.forEach(element => {
            x.push(JSON.parse(element));
          });
         
          this.err.password = x;
          
        }
        if(this.err?.password_confirmation){
          this.err.password_confirmation = JSON.parse(err.error.errors.password_confirmation);
        }
        if(this.err?.old_password){
         /// this.err.old_password = JSON.parse(err.error.errors.old_password);
        }

      }
    );
  }
  togelPassword_old() {
    if(this.showpassword){
      this.showpassword=false;
    }else{
      this.showpassword=true;
    }
  }
  togelPassword() {
    if(this.password){
      this.password=false;
    }else{
      this.password=true;
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
