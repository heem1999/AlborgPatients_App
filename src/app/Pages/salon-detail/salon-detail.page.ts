import { UtilService } from "./../../services/util.service";
import { ApiService } from "./../../services/api.service";
import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-salon-detail",
  templateUrl: "./salon-detail.page.html",
  styleUrls: ["./salon-detail.page.scss"],
})
export class SalonDetailPage implements OnInit {
  data: any = {};
  err: any = {};
  lan
  
  
  state: any = 1;
  constructor(
    private navCtrl: NavController,
    private api: ApiService,
    private util: UtilService
  ) {
    this.lan=localStorage.getItem("Language");
    this.util.startLoad();
    this.api.getDataWithToken("branch/" + this.api.id).subscribe(
      (res: any) => {
        if (res.success) {
          this.util.dismissLoader();
          this.data = res.data;

          this.data.start_time = this.transform(this.data.start_time);
          this.data.end_time = this.transform(this.data.end_time);
        }
      },
      (err) => {
        this.util.dismissLoader();
        this.err = err.error.errors;
      }
    );
  }

  ngOnInit() {}

  logScrolling(ev) {
    if (ev.detail.scrollTop >= 200) {
      this.state = 2;
    } else {
      this.state = 1;
    }
  }

  bookNow() {
    this.navCtrl.navigateForward("/select-service");
    //this.navCtrl.navigateForward("/select-time");
  }
  transform(time: any): any {
    let hour = time.split(":")[0];
    let min = time.split(":")[1];
    let part;
    if(this.lan=="En"){
       part = hour >= 12 ? "pm" : "am";
    }else{
       part = hour >= 12 ? "م" : "ص";
    }
    
    min = (min + "").length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour + "").length == 1 ? `0${hour}` : hour;
    return `${hour}:${min} ${part}`;
  }

  
  isfavrite(id) {
    this.util.startLoad();
    this.api.getDataWithToken("favorite/salon/" + id).subscribe(
      (res: any) => {
        if (res.success) {
          this.util.dismissLoader();
          if (this.data.fev == 0) {
            this.data.fev = 1;
          } else {
            this.data.fev = 0;
          }
        }
      },
      (err) => {
        this.navCtrl.navigateRoot("signin");
        this.util.dismissLoader();
        this.err = err.error.errors;
      }
    );
  }

  openSalonLocation(data){
    let destination = data.lat + ',' + data.lng;
    window.open("https://www.google.com/maps/search/?api=1&query="+destination, '_system')
  }
}
