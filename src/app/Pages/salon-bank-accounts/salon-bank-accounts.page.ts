import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';


@Component({
  selector: 'app-salon-bank-accounts',
  templateUrl: './salon-bank-accounts.page.html',
  styleUrls: ['./salon-bank-accounts.page.scss'],
})
export class SalonBankAccountsPage implements OnInit {
  tiltle
  data: any = {};
  lan
  
  constructor(private clipboard: Clipboard,private api: ApiService, public translateService: TranslateService, private modalCtrl: ModalController, private util: UtilService) {
    this.translateService.get("SalonBankAccountsPage.text1").subscribe(res => {
      this.tiltle = res;
    });

    this.lan = localStorage.getItem("Language");
    this.data=this.api.salon_bank_acc;
    
  }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
  ionViewWillEnter() {
    this.translateService.get("SalonBankAccountsPage.text1").subscribe(res => {
      this.tiltle = res;
    });
  }

  copy_acc(x){
    this.clipboard.copy(x);
    if (localStorage.getItem("Language") == "En") {
      this.util.presentToast("The bank account number has been copied.");
    } else {
      this.util.presentToast("تم نسخ رقم الحساب المصرفي.");
    }
  }
}
