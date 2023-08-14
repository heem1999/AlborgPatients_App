import { UtilService } from "./../../services/util.service";
import { ApiService } from "./../../services/api.service";
import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  data: any = {};
  err: any = {};

  constructor(
    private navCtrl: NavController,
    private api: ApiService,
    private util: UtilService
  ) {
    this.util.startLoad();
    this.api.getDataWithToken("profile").subscribe(
      (res: any) => {
        this.util.dismissLoader();
        this.data = res;
        if (this.data.noti) {
          this.data.noti = true;
        } else {
          this.data.noti = false;
        }
      },
      (err) => {
        this.util.dismissLoader();
        this.err = err.error.errors;
      }
    );
  }

  ngOnInit() {}

  viewPage(path) {
    this.navCtrl.navigateForward(path);
  }
  dataChanged() {
    let info: any = {};
    console.log(this.data.noti);

    if (this.data.noti) {
      info.noti = 0;
    } else {
      info.noti = 1;
    }

    this.util.startLoad();
    this.api.postDataWithToken("profile/update", info).subscribe(
      (res: any) => {
        if (res.success) {
          this.api.getDataWithToken("profile").subscribe(
            (res: any) => {
              this.util.dismissLoader();
              this.data = res;
            },
            (err) => {
              this.util.dismissLoader();
              this.err = err.error.errors;
            }
          );

          this.util.presentToast("Profile is updated");
        } else {
          this.util.presentToast(res.message);
        }
      },
      (err) => {
        this.err = err.error.errors;
      }
    );
  }
}
