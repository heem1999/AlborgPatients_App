import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-sort-modal2",
  templateUrl: "./sort-modal2.page.html",
  styleUrls: ["./sort-modal2.page.scss"],
})
export class SortModal2Page implements OnInit {
  category = "0";
  lan
  contract_classifications= [];
  constructor(private navParams: NavParams,public translateService: TranslateService,private modalCtrl: ModalController) {}

  ionViewWillEnter() {
    this.lan=localStorage.getItem("Language");
   
    if(this.navParams.get('contract_classifications')){
      this.category= localStorage.getItem("genderFilter");
      
      this.contract_classifications=this.navParams.get('contract_classifications');
    }

   // this.category = localStorage.getItem("genderFilter");
  
  }

  ngOnInit() {

  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
  filter(val2) {
    if(val2){
    localStorage.setItem("genderFilter", val2.id);
    }
    this.modalCtrl.dismiss(val2);
  }
}
