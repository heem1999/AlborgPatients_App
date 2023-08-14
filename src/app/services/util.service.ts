import { Injectable } from "@angular/core";
import { ToastController, LoadingController } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class UtilService {
  public isUpdateProfile = new BehaviorSubject(false);
  isLoading = false;

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 6000,
    });
    toast.present();
  }
  async startLoad() {

    this.isLoading = true;

    return await this.loadingController
      .create({
        duration: 3000,
        message: localStorage.getItem("Language") == "En"?"Please wait...":"يرجى الانتظار...",
      })
      .then((a) => {
        a.present().then(() => {
          if (!this.isLoading) {
            a.dismiss().then(() => {});
          }
        });
      });
  }
  async dismissLoader() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }
}
