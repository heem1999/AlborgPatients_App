import { UtilService } from "./../../services/util.service";
import { ApiService } from "./../../services/api.service";
import { Component, OnInit } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import { SuccessModalPage } from "../success-modal/success-modal.page";

@Component({
  selector: "app-my-appointment",
  templateUrl: "./my-appointment.page.html",
  styleUrls: ["./my-appointment.page.scss"],
})
export class MyAppointmentPage implements OnInit {
  activeSegment: any = "Upcoming";
  data: any = {};
  appoinment: any = [
  ];
  err: any = {};
  floting
  lan
  stop_time
  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private api: ApiService,
    private util: UtilService
  ) {
    this.lan = localStorage.getItem("Language");
    if (localStorage.getItem("Language") == "En") {
      this.floting = 'btn-view ion-float-right';
    } else {
      this.floting = 'btn-view ion-float-left';
    }

    this.reload();
  }

  ngOnInit() {}

  viewDetail(id) {
    this.api.bookid = id;
    this.navCtrl.navigateForward("/past-order-detail");
  }
  gotoHome() {
    this.navCtrl.navigateRoot("tabs/home");
  }
  doRefresh(event) {
    this.api.getDataWithToken("booking").subscribe(
      (res: any) => {
        if (res.success) {
          this.data = res.data;
          event.target.complete();
        }
      },
      (err) => {
        event.target.complete();
      }
    );
  }

  reload() {
    this.util.startLoad();
    this.api.getDataWithToken("booking").subscribe(
      (res: any) => {
        if (res.success) {
          this.util.dismissLoader();
         this.data = res.data;
        }
      },
      (err) => {
        this.util.dismissLoader();
        this.err = err.error.errors;
      }
    );
  }

  ionViewWillEnter() {
   this.stop_time= setInterval(() => {
    this.api.getDataWithToken("booking").subscribe(
      (res: any) => {
        if (res.success) {
          this.data = res.data;
        }
      },
      (err) => {
        this.err = err.error.errors;
      }
    );
    }, 15000);
  }

  ionViewWillLeave(){
    clearInterval(this.stop_time);
  }

  async ViewStatusInfo(){
    const modal = await this.modalCtrl.create({
      component: SuccessModalPage,
      componentProps: { 
        ViewStatusInfo: true,
      },
     //backdropDismiss: false,
      cssClass: "success-modal",
    });
    return await modal.present();
  }


 

}
