import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { ApiService } from "./../../services/api.service";
import { UtilService } from "./../../services/util.service";
import { Component, OnInit } from "@angular/core";
import { ActionSheetController } from "@ionic/angular"

@Component({
  selector: 'app-payment-notifications',
  templateUrl: './payment-notifications.page.html',
  styleUrls: ['./payment-notifications.page.scss'],
})
export class PaymentNotificationsPage implements OnInit {
  customOptions: any = {
    header: "Country Code",
  };
  data: any =[];
  err: any = {};
  isNewProfile: boolean = false;
  imgProfile: any;
  imageUri: any;
  userName: any;
  lan
  constructor(
    private util: UtilService,
    public api: ApiService,
    private camera: Camera,
    private actionSheetController: ActionSheetController
  ) {
    this.lan=localStorage.getItem("Language");
    this.util.startLoad();
    this.api.getDataWithToken("paymentNotifyImg/"+ this.api.bookid).subscribe(
      (res: any) => {
        this.util.dismissLoader();
        if (res.success) {
        this.data = res.data;
        
        }
      },
      (err) => {
        this.util.dismissLoader();
        this.err = err.error.errors;
      }
    );
  }
  
  ngOnInit() {
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
    const cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
    };
    this.camera.getPicture(cameraOptions).then(
      (fileUri) => {
        this.imgProfile = "data:image/jpg;base64," + fileUri;
        this.imageUri = fileUri;
        this.isNewProfile = true;
        this.upload_file();
      },
      (err) => {
        console.log(err)
      }
    );
  }
  getCamera() {
    const cameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
    };
    this.camera.getPicture(cameraOptions).then(
      (fileUri) => {
        this.imgProfile = "data:image/jpg;base64," + fileUri;
        this.imageUri = fileUri;
        this.isNewProfile = true;
        this.upload_file();
      },
      (err) => {}
    );
  }
  upload_file() {
    let changeImage: any = {};
    changeImage.image = this.imageUri;
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
  delete_payment_notification(notification_id){
    this.util.startLoad();
    this.api.getDataWithToken("delete_payment_notification/"+ notification_id).subscribe(
      (res: any) => {
        this.util.dismissLoader();
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
      },
      (err) => {
        this.util.dismissLoader();
        this.err = err.error.errors;
      }
    );
  }

}
