import { UtilService } from "./../../services/util.service";
import { ApiService } from "./../../services/api.service";
import { Component, OnInit } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import { CancelBookingPage } from "../cancel-booking/cancel-booking.page";

@Component({
  selector: "app-booking-confirm",
  templateUrl: "./booking-confirm.page.html",
  styleUrls: ["./booking-confirm.page.scss"],
})
export class BookingConfirmPage implements OnInit {
  data: any = {};
  err: any = {};

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private api: ApiService,
    private util: UtilService
  ) {
    this.util.startLoad();
    this.api.getDataWithToken("booking/" + this.api.bookid).subscribe(
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

  ngOnInit() {}

  async cancelBooking() {
    const modal = await this.modalCtrl.create({
      component: CancelBookingPage,
      backdropDismiss: false,
      cssClass: "cancel-boooking-modal",
    });
    return await modal.present();
  }

  viewDirection() {
    this.navCtrl.navigateForward("/direction");
  }
}
