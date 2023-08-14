import { UtilService } from "./../../services/util.service";
import { ApiService } from "./../../services/api.service";
import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  data: any = {};
  err: any = {};
  constructor(
    private navCtrl: NavController,
    private api: ApiService,
    private util: UtilService
  ) {
    this.getUserDate();
  }

  ngOnInit() {}

  editProfile() {
    this.navCtrl.navigateForward("/edit-profile");
  }

  viewPage(path) {
    this.navCtrl.navigateForward(path);
  }

  viewAbout() {
    this.util.startLoad();
    this.api.getData("about_us").subscribe(
      (res: any) => {
        if (res.success) {
          this.util.dismissLoader();
        this.api.about_data = res.data;
        this.navCtrl.navigateForward("/favorites");
        }
      },
      (err) => {
        this.util.dismissLoader();
        this.err = err.error.errors;
      }
    );
  }


  logOut() {
    var old_lan=localStorage.getItem("Language");
    var intro=localStorage.getItem("intro");
    localStorage.clear();
    localStorage.setItem("Language",old_lan);
    localStorage.setItem("intro",intro);
    this.navCtrl.navigateRoot("/signin");
  }
  getUserDate() {
    this.util.isUpdateProfile.subscribe((s) => {
      if (!s) {
        this.util.startLoad();
      }

      this.api.getDataWithToken("profile").subscribe(
        (res: any) => {

          this.data = res;

          if (!s) {
            this.util.dismissLoader();
          }
        },
        (err) => {
          if (!s) {
            this.util.dismissLoader();
          }
          this.err = err.error.errors;
        }
      );
    });
  }
}
