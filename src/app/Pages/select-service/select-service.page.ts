import { UtilService } from "./../../services/util.service";
import { ApiService } from "./../../services/api.service";
import { Component, OnInit } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import { SuccessModalPage } from "../success-modal/success-modal.page";

@Component({
  selector: "app-select-service",
  templateUrl: "./select-service.page.html",
  styleUrls: ["./select-service.page.scss"],
})
export class SelectServicePage implements OnInit {
  data: any = [];
  Clinical_units: any = [];
  message = '';
  err: any = {};
  currency: any;
  lan
  term
  constructor(private modalCtrl: ModalController,
    private navCtrl: NavController,
    private api: ApiService,
    private util: UtilService
  ) {

    this.lan = localStorage.getItem("Language");

    this.getsServices();

  }

  ngOnInit() { }

  getsServices() {
    let contact_id = this.api.selectedPayerData['contracts'][0]['id'];
    let payer_code = this.api.selectedPayerData['code'];
    this.util.startLoad();
    this.api
      .getDataWithToken("AlborgService/" + contact_id + "/" + payer_code)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.util.dismissLoader();
            this.Clinical_units = res.Clinical_units;
            this.data = res.data;
            this.data.forEach(element => {
              element.services.forEach(element2 => {
                element2.checked = false;
              });
            });
          } else {
            //this inssurance
            if (this.lan == "En") {
              this.message = res.msg;
            } else {
              this.message = res.msg_ar;
            }
          }
        },
        (err) => {
          this.util.dismissLoader();
          this.err = err.error.errors;
        }
      );
  }

  getClinicalName(cl_id) {
    let value = 'dd';
    for (let index = 0; index < this.Clinical_units.length; index++) {
      if (this.Clinical_units[index]['id'] == cl_id) {
        if (this.lan == "En") {
          value = this.Clinical_units[index]['name_en'];
          break;
        } else {
          value = this.Clinical_units[index]['name_ar'];
          break;
        }
      }

    }
    return value;
  }


  continue() {
    this.navCtrl.navigateForward("/confirm");
  }

  changecat(id) {
    var element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    } else {
      if (localStorage.getItem("Language") == "En") {
        this.util.presentToast('Sorry, No service belongs to this lab unit.');
      } else {
        this.util.presentToast('عذرًا ، لا توجد خدمة تنتمي إلى وحدة المختبر هذه.');
      }
    }

  }

  serviceDetails(service) {

    this.util.startLoad();
    this.api
      .getDataWithToken("ServiceTests/" + service.id+"/"+service.is_nested_services)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.util.dismissLoader();
            let services_daa={service:service,service_tests:res.data};
          this.showserviceDetails(services_daa);

          }
        },
        (err) => {
          this.util.dismissLoader();
          this.err = err.error.errors;
        }
      );

  }

  async showserviceDetails(service) {
   this.api.serviceDetails=service;
    this.navCtrl.navigateForward("/service-details");
  }


  change(subitem, all_subitem) {
    subitem.checked = !subitem.checked;
    let index = 0;
    let flag = 0;
    this.api.selectedServices.forEach(element => {
      if (element.service_id == all_subitem.service_id) {
        this.api.selectedServices.splice(index, 1);
        flag = 1;
      }
      index++;
    });

    if (flag == 0) {
      this.api.selectedServices.push(all_subitem);
    }
  }

}
