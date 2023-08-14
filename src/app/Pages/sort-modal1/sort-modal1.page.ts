import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-sort-modal1",
  templateUrl: "./sort-modal1.page.html",
  styleUrls: ["./sort-modal1.page.scss"],
})
export class SortModal1Page implements OnInit {
  sort = "";
  constructor(public translateService: TranslateService,private modalCtrl: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }
  ionViewWillEnter() {
    let value = localStorage.getItem("sort");
    this.translateService.get("SortModal1Page.text"+value).subscribe(res => {
      this.sort = res;
    });
  }
  filter(val,val2) {
    if(val2){
      localStorage.setItem("sort", val2);
    }
    //localStorage.setItem("sort", val2);
    this.modalCtrl.dismiss(val2);
  }
}
