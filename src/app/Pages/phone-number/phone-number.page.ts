import { Component, OnInit, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.page.html',
  styleUrls: ['./phone-number.page.scss'],
})
export class PhoneNumberPage implements OnInit {
  customOptions: any = {
    header: 'Country Code'
  };

  constructor(private navCtrl:NavController) { 
  }

  ngOnInit() {
  }

  doContinue(){
    this.navCtrl.navigateRoot('/tabs/home');
  }
}
