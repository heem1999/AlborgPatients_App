import { UtilService } from "./../../services/util.service";
import { ApiService } from "./../../services/api.service";
import { Component, OnInit } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import * as moment from "moment";
import { FcmService } from "src/app/services/fcm.service";
import { NavParams } from '@ionic/angular';

@Component({
  selector: "app-select-time",
  templateUrl: "./select-time.page.html",
  styleUrls: ["./select-time.page.scss"],
})
export class SelectTimePage implements OnInit {
  calender: any = {
    month: "",
    year: "",
    date: [],
    currentMonth: new Date().getMonth() + 1,
    currentYear: new Date().getFullYear(),
    currentDay: new Date().getDate(),
  };
  selected: any = "";
  isOpen: any = false;
  timeSlot: any = [];
  serviceList: any = [
    { name: "Professional Hair Wash", price: 25, duration: 30 },
    { name: "Hair Spa Wash", price: 35, duration: 45 },
    { name: "Child Hair Cut", price: 25, duration: 45 },
  ];
  slice: any = {
    from: 0,
    to: 0,
  };
  err: any = {};
  lan
  branch_off_day=false;
  employee_has_off_day=false;
  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private api: ApiService,
    private util: UtilService,
    private fcmService: FcmService
  ) {
    this.lan = localStorage.getItem("Language");
   
   
  }

  ngOnInit() {
    var today: any = new Date();
    this.calender.month = today.getMonth() + 1;
    this.calender.year = today.getFullYear();
    this.slice.from = this.calender.currentDay - 1;
    this.slice.to = this.calender.currentDay + 6;
    this.selected =
      this.calender.year +
      "-" +
      this.calender.month +
      "-" +
      ("0" + today.getDate()).slice(-2);
    this.action(0);
    this.request();

    //this.fcmService.initPush();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
  

  bookNow() {
    this.selected= moment(this.selected).format("YYYY-MM-DD");
    //console.log(this.selected);

    if (this.selected) {
      //let date_time=this.api.time.date+' '+this.api.time.timeslot;
      
      this.modalCtrl.dismiss(this.selected);
    } else {
      if (this.lan == "En") {
        this.util.presentToast("Please select the visit date.");
      } else {
        this.util.presentToast(" الرجاء تحديد يوم الزيارة.");
      }
    }
  }

  action(check) {
    //console.log("check: ", check);
    if (check != 0) {
      if (check == 2) {
        this.slice.from = this.slice.from + 7;
        this.slice.to = this.slice.to + 7;
        if (this.slice.from >= 28) {
          this.slice.from = 0;
          this.slice.to = 7;
          if (this.calender.month == 12) {
            this.calender.month = 1;
            this.calender.year += 1;
          } else {
            this.calender.month += 1;
          }
        }
      }
      if (check == 1) {
        this.slice.from = this.slice.from - 7;
        this.slice.to = this.slice.to - 7;
        if (this.slice.from <= 1) {
          if (this.calender.month == 1) {
            this.calender.month = 12;
            this.calender.year -= 1;
          } else {
            this.calender.month -= 1;
          }
          let days = moment(
            this.calender.year + "-" + this.calender.month,
            "YYYY-MM"
          ).daysInMonth();
          //  console.log("days", days);
          this.slice.from = days - 7;
          this.slice.to = days;
          //console.log("this.slice: ", this.slice);
        }
      }
    }

    this.calender.date = [];
    let days: any;
    days = moment(
      this.calender.year + "-" + this.calender.month,
      "YYYY-MM"
    ).daysInMonth();
    let state = false;
    for (let i: any = 0; i < days; i++) {
      let day =
        this.calender.year +
        "-" +
        this.calender.month +
        "-" +
        ("0" + parseInt(i + 1)).slice(-2);
      if (
        this.calender.currentYear == this.calender.year &&
        this.calender.currentMonth == this.calender.month
      ) {
        //console.log(this.calender.currentDay);
        // console.log(this.slice);
        if (("0" + parseInt(i + 1)).slice(-2) == this.calender.currentDay) {
          state = true;
          // console.log("state: ", state);
        }
        // console.log("state: ", state);
        if (state == false) {
          this.calender.date.push({ date: day, selected: false });
        } else {
          this.calender.date.push({ date: day, selected: true });
        }
      } else {
        if (this.calender.year == this.calender.currentYear) {
          if (this.calender.month >= this.calender.currentMonth) {
            this.calender.date.push({ date: day, selected: true });
          } else {
            this.calender.date.push({ date: day, selected: false });
          }
        } else {
          if (this.calender.year > this.calender.currentYear) {
            this.calender.date.push({ date: day, selected: true });
          }
        }
      }
    }

    //console.log("calender", this.calender);
  }

  request() {
    let rdata: any = {};
    rdata.branch_id = this.api.id;
    rdata.emp_id = this.navParams.get('emp_id');
    rdata.service_id =  this.navParams.get('service_id');
    rdata.date = moment(this.selected).format("YYYY-MM-DD");
   
  }
  transform(time: any): any {
    //console.log(time);
    let hour = time.split(":")[0];
    let min = time.split(":")[1];

    let part = hour >= 12 ?  "pm" : "am";
    //let part = hour >= 12 ? localStorage.getItem("Language") == "En" ? "pm" : "م" : localStorage.getItem("Language") == "En" ? "am" : "ص";
    min = (min + "").length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour + "").length == 1 ? `0${hour}` : hour;
    return `${hour}:${min} ${part}`;
  }
  activeSlot(i) {
    this.timeSlot.forEach((element) => {
      element.issel = false;
    });
    i.issel = true;
  }
}
