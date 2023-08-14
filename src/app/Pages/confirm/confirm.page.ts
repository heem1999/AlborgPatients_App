import { UtilService } from "./../../services/util.service";
import { ApiService } from "./../../services/api.service";
import { Component, OnInit } from "@angular/core";
import { ActionSheetController, ModalController, NavController } from "@ionic/angular";
import { SelectTimePage } from "../select-time/select-time.page";
import { SuccessModalPage } from "../success-modal/success-modal.page";

import * as moment from "moment";
import { Camera } from "@awesome-cordova-plugins/camera/ngx";
@Component({
  selector: "app-confirm",
  templateUrl: "./confirm.page.html",
  styleUrls: ["./confirm.page.scss"],
})
export class ConfirmPage implements OnInit {
  serviceList: any = [];
  Attachments: any = [];
  data: any = {};
  err: any = {};
  seldate: any;
  timeslot: any;
  discount: number = 0;
  total: number = 0;
  duration: number = 0;
 isemployee = false;
  currency: any;
  lan
  constructor(
    private actionSheetController: ActionSheetController,
    private camera: Camera,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private api: ApiService,
    private util: UtilService
  ) {
    this.lan=localStorage.getItem("Language");
    
    this.getTotal();
    
  }

  ngOnInit() {}
  ionViewWillEnter() {
    this.serviceList= this.api.selectedServices;
    this.Attachments= this.api.Attachments;
    
    if (this.api.time.discount) {
      this.discount = this.api.time.discount;
    }
  }

  applyPromo() {
    this.navCtrl.navigateForward("/offer");
  }

  closePage() {
    this.api.showOrderDetails=false;
    this.modalCtrl.dismiss();
  }

  
  getTotal() {
    let temp = 0;
  
    if (this.serviceList && this.serviceList.length != 0) {
      this.serviceList.forEach((ser) => {
        this.total += parseFloat(ser.current_price);
      });
    }

    return {
      temp
    };
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: localStorage.getItem("Language")=='En'? "Select an option":'حدد خيارًا',
      buttons: [
        {
          text: localStorage.getItem("Language")=='En'? "Camera":'الكاميرا',
          icon: "camera",
          handler: () => {
            this.getCamera();
          },
        },
        {
          text: localStorage.getItem("Language")=='En'? "Gallery":"معرض الصور",
          icon: "images-outline",
          handler: () => {
            this.getGallery();
          },
        },
        {
          text: localStorage.getItem("Language")=='En'? "Close":"إغلاق",
          icon: "close",
          handler: () => {},
        },
      ],
    });
    await actionSheet.present();
  }

  getGallery() {
  let images=['https://img.freepik.com/premium-vector/health-insurance-card-flat-design-white-background-medical-insurance-card-concept-vector-illustration-pink-color_505557-4011.jpg','https://www.the-hospitalist.org/wp-content/uploads/2022/05/Hassprescription-1024x768.jpg','https://c.ndtvimg.com/2022-09/2tcj87po_doctor-neat-prescription-650_625x300_28_September_22.jpg'];
    this.Attachments=images;
    this.api.Attachments=this.Attachments;
    /*const cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
    };
    this.camera.getPicture(cameraOptions).then(
      (fileUri) => {
        this.Attachments.push("data:image/jpg;base64," + fileUri);
        this.api.Attachments=this.Attachments;
        //this.imageUri = fileUri;
      },
      (err) => {
        console.log(err)
      }
    );*/
  }
  getCamera() {
    const cameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
    };
    this.camera.getPicture(cameraOptions).then(
      (fileUri) => {
        this.Attachments.push("data:image/jpg;base64," + fileUri);
       // this.imgProfile = "data:image/jpg;base64," + fileUri;
       // this.imageUri = fileUri;
        //this.upload_file();
      },
      (err) => {}
    );
  }
  upload_file() {
    let changeImage: any = {};
    changeImage.image = this.Attachments;
    changeImage.id = this.api.bookid;
    this.util.startLoad();
    this.api.postDataWithToken("upload_paymentNotifyImg", changeImage).subscribe(
      (res: any) => {
        if (res.success) {
          if(localStorage.getItem("Language")=="En"){
            this.util.presentToast(res.msg);
          }else{
            this.util.presentToast(res.msg_ar);
          }
          this.api.getDataWithToken("paymentNotifyImg/"+ this.api.bookid).subscribe(
            (res: any) => {
              this.util.dismissLoader();
              this.data = res.data;
            },
            (err) => {
              this.util.dismissLoader();
              this.err = err.error.errors;
            }
          );
        }
      },
      (err) => {
        console.log(err)
        this.util.dismissLoader();
      }
    );
  }

  delete_Attachment(index){
    this.Attachments.splice(index,1);
    this.api.Attachments=this.Attachments;
  }

  async imageViewer(imageViewer,i){
    const modal = await this.modalCtrl.create({
      component: SuccessModalPage,
      componentProps: { 
        imageViewer: imageViewer,
      },
     // backdropDismiss: false,
      cssClass: "success-modal",
    });
    modal.onDidDismiss().then((data) => {
      if (data["data"] != undefined) {
        this.delete_Attachment(i);
      }
    });

    return await modal.present();
  }


  bookNow() {
    this.navCtrl.navigateForward("/payment");
  }
 

  async selectEmployee(data, selectedEmp) {
    data.selectedEmp = selectedEmp.emp_id;
    
    const modal = await this.modalCtrl.create({
      component: SelectTimePage,
      backdropDismiss: false,
      componentProps: { 
        emp_id: selectedEmp.emp_id,
        service_id: data.service_data.id
      },
      cssClass: "success-modal",
    });
    modal.onDidDismiss()
    .then((data_time) => {
      var selected_day =moment(data_time.data);
      let flag=0;
      
      for (let index = 0; index < this.serviceList.length; index++) {
        var element = this.serviceList[index];
        if(element.booking_date_time){
          var selected_day_old =  moment(element.booking_date_time);

         let duration= element.time;
         //const dateIsAfter = moment(selected_day).isAfter(moment(selected_day_old ));
         //const dateIsBefore = moment(selected_day).isBefore(moment(selected_day_old)); 
        const dateIsSame = moment(selected_day).isBetween(moment(selected_day_old),moment(selected_day_old).add(duration, 'minutes'));
        if(dateIsSame){
          flag=1;
          if(this.lan=="En"){
            this.util.presentToast("Sorry, you cannot select the same time for multiple services.");
          }else{
            this.util.presentToast("عذرًا ، لا يمكنك تحديد نفس الوقت لخدمات متعددة.");
          }
          break;
        }
      //console.log(`Date is After: ${dateIsAfter}`);
      //console.log(`Date is Same: ${dateIsSame}`);
      //console.log(`Date is Before: ${dateIsBefore}`);
          
        }
      }
     
     if(flag==0){
      data.booking_date_time = data_time.data;
     }
      
  });

     await modal.present();
   //data.selectedEmp = selectedEmp.id;
    data.employee_data.forEach((emp) => {
      emp.selected = false;
      if (emp.emp_id == selectedEmp.emp_id) {
        emp.selected = true;
        //this.isemployee = true;
      }
      
    });
  }

 
}
