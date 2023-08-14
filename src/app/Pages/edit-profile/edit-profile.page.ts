//import { Camera } from "@ionic-native/camera/ngx";
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { ApiService } from "./../../services/api.service";
import { UtilService } from "./../../services/util.service";
import { Component, OnInit } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.page.html",
  styleUrls: ["./edit-profile.page.scss"],
})
export class EditProfilePage implements OnInit {
  customOptions: any = {
    header: "Country Code",
  };
  data: any = {};
  err: any = {};
  isNewProfile: boolean = false;
  imgProfile: any;
  imageUri: any;
  userName: any;
  constructor(
    private util: UtilService,
    private api: ApiService,
    private camera: Camera,
    private actionSheetController: ActionSheetController
  ) {
    this.util.startLoad();
    this.api.getDataWithToken("profile").subscribe(
      (res: any) => {
        this.util.dismissLoader();
        this.data = res;
        this.userName = res.name;
        this.imgProfile = res.imageUri;
      },
      (err) => {
        this.util.dismissLoader();
        this.err = err.error.errors;
      }
    );
  }

  ngOnInit() {}
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
        this.profileImage();
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
        this.profileImage();
      },
      (err) => {}
    );
  }
  profileImage() {
    let changeImage: any = {};
    changeImage.image = this.imageUri;
    this.util.startLoad();
    this.api.postDataWithToken("profile/picture/update", changeImage).subscribe(
      (res: any) => {
        if (res.success) {
          this.util.isUpdateProfile.next(true);
          this.util.presentToast(res.msg);
          this.api.getDataWithToken("profile").subscribe(
            (res: any) => {
              this.util.dismissLoader();
              this.data = res;
              this.userName = res.name;
              this.imgProfile = res.imageUri;
            },
            (err) => {
              this.util.dismissLoader();
              this.err = err.error.errors;
            }
          );
        }
      },
      (err) => {
        this.util.dismissLoader();
      }
    );
  }
  updateProfile() {
    this.util.startLoad();
    delete this.data.liked_salon;
    this.api
      .postDataWithToken("profile/update", {
        name: this.data.name,
        email: this.data.email,
        phone_no: this.data.phone_no,
      })
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.util.isUpdateProfile.next(true);

            this.api.getDataWithToken("profile").subscribe(
              (res: any) => {
                this.util.dismissLoader();
                this.data = res;
                this.imgProfile = res.imageUri;
              },
              (err) => {
                this.util.dismissLoader();
                this.err = err.error.errors;
              }
            );
            if(localStorage.getItem("Language")=='En'){
              this.util.presentToast("Profile is updated");
            }else{
              this.util.presentToast("تم تحديث الملف الشخصي");
            }
            
          } else {
            this.util.presentToast(res.message);
          }
        },
        (err) => {
          this.err = err.error.errors;
        }
      );
  }
}
