import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.page.html',
  styleUrls: ['./cancel-booking.page.scss'],
})
export class CancelBookingPage implements OnInit {

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
