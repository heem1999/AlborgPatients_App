import { UtilService } from "./../../services/util.service";
import { ApiService } from "./../../services/api.service";
import { Component, OnInit } from "@angular/core";
import { Data } from "@angular/router";
import { ActionSheetController, AlertController, ModalController, NavController } from "@ionic/angular";
import { SalonBankAccountsPage } from "../salon-bank-accounts/salon-bank-accounts.page";
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
import { SuccessModalPage } from "../success-modal/success-modal.page";
import { Camera } from "@awesome-cordova-plugins/camera/ngx";

@Component({
  selector: "app-past-order-detail",
  templateUrl: "./past-order-detail.page.html",
  styleUrls: ["./past-order-detail.page.scss"],
})
export class PastOrderDetailPage implements OnInit {
  data: any = {};
  err: any = {};
  rdata: any = {star:''};
  BankAcc_data: any = {};
  lan
  stop_time
BookingServices=[];
MedicalAttachments=[];
  constructor(private actionSheetController: ActionSheetController,private camera: Camera,public alertController: AlertController,private clipboard: Clipboard,private modalCtrl: ModalController, private navCtrl: NavController, private api: ApiService, private util: UtilService) {
    this.lan = localStorage.getItem("Language");
   
    this.loadOrderDetails();
  }

  loadOrderDetails(){
    this.util.startLoad();
    this.api.getDataWithToken("booking/" + this.api.bookid).subscribe(
      (res: any) => {
        if (res.success) {
          this.util.dismissLoader();
          this.data = res.data;
          this.api.order_details= this.data; //used on payments notification and acc's
          this.BookingServices= res.BookingServices;
          this.MedicalAttachments= res.MedicalAttachments;
          
          if (res.data.review) {
            this.rdata = this.data.review;
          }
          if(this.data.status<=5){
            if (localStorage.getItem("Language") == "En") {
              this.ViewStatusInfo2(res.message_en)
            } else {
              this.ViewStatusInfo2(res.message_ar)
            }
          }
         // this.viewBankAcc(this.data.branch_id);
        }
      },
      (err) => {
        this.util.dismissLoader();
        this.err = err.error.errors;
      }
    );
  }

  ionViewDidEnter() {
    this.stop_time= setInterval(() => {
      this.api.getDataWithToken("booking/" + this.api.bookid).subscribe(
        
        (res: any) => {
          if (res.success) {
            this.data = res.data;
          this.api.order_details= this.data; //used on payments notification and acc's
          this.BookingServices= res.BookingServices;
          this.MedicalAttachments= res.MedicalAttachments;
          if (res.data.review) {
            this.rdata = this.data.review;
          }
          }
        },
        (err) => {
          this.err = err.error.errors;
        }
      );
     }, 13000);
   }
 
   ionViewWillLeave(){

     clearInterval(this.stop_time);
   }


  ngOnInit() { }
  review() {
    this.rdata.booking_id = this.data.id;

    this.util.startLoad();
    this.api.postDataWithToken("review", this.rdata).subscribe(
      (res: any) => {
        if (res.success) {
          this.util.dismissLoader();
          this.util.presentToast(res.msg);
          this.loadOrderDetails();
        }
      },
      (err) => {
        this.util.dismissLoader();
        this.err = err.error.errors;
      }
    );
  }

  viewPayment(id) {
    this.api.bookid = id;
    this.navCtrl.navigateForward("/payment-notifications");
  }


  approveOrder(order_id){
    var header,subHeader,message,yes,no,note;
    
    if (localStorage.getItem("Language") == "En") {
      header='Confirm Alert';
      subHeader="Beware let's confirm";
      message='Are you sure you want to approve this request?';
      yes='Approval!';
      no='No';
    } else {
      header='تنبيه للتأكيد ';
      subHeader='احذر دعنا نؤكد';
      message='هل أنت متأكد أنك تريد الموافقة علي هذا الطلب؟';
      yes='إعتماد!';
      no='لا';
    }


    this.alertController.create({
      header: header,
      subHeader:subHeader ,
      message:message ,
      
      buttons: [
        {
          text: no,
          handler: () => {
          }
        },
       
        {
          text: yes,
          handler: () => {
            let info: any = {};
            info.order_id = order_id;
          this.api.postDataWithToken("approveOrder",info).subscribe(
              (res: any) => {
                if (res.success) {
                  this.util.dismissLoader();
                  this.loadOrderDetails();//reload details

                  if (localStorage.getItem("Language") == "En") {
                      this.util.presentToast("Request approved successfully!");
                    } else {
                      this.util.presentToast("تم اعتماد الطلب بنجاح!");
                    }
                }
              },
              (err) => {
                this.util.dismissLoader();
              }
            );
          }
        }
      ]
     
    }).then(res => {
      res.present();
    });
  }

  cancelOrder(order_id){
    var header,subHeader,message,yes,no,note;
    
    if (localStorage.getItem("Language") == "En") {
      header='Confirm Alert';
      subHeader="Beware let's confirm";
      message='Are you sure you want to cancel this request?';
      yes='Yes!';
      no='No';
      note="leave a comment...";
    } else {
      header='تنبيه للتأكيد ';
      subHeader='احذر دعنا نؤكد';
      message='هل أنت متأكد أنك تريد إلغاء هذا الطلب؟';
      yes='نعم!';
      no='لا';
      note="اترك تعليقا...";
    }


    this.alertController.create({
      header: header,
      subHeader:subHeader ,
      message:message ,
      
      buttons: [
        {
          text: no,
          handler: () => {
           // console.log('I care about humanity');
          }
        },
       
        {
          text: yes,
          handler: (comment) => {
            let info: any = {};
            info.order_id = order_id;
            if(comment[0]==''){
              info.comment = "N/A";
            }else{
              info.comment = comment[0];
            }
          this.api.postDataWithToken("cancelOrder",info).subscribe(
              (res: any) => {
                if (res.success) {
                  this.util.dismissLoader();
                  if (localStorage.getItem("Language") == "En") {
                      this.util.presentToast("Request cancel successfully!");
                    } else {
                      this.util.presentToast("تم إلغاء الطلب بنجاح!");
                    }
                }
              },
              (err) => {
                this.util.dismissLoader();
              }
            );
          }
        }
      ],
      inputs: [
        {
          type: 'textarea',
          placeholder: note,
        },
      ]
    }).then(res => {
      res.present();
    });
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
        this.delete_attachment_file(i);
      }
    });
    return await modal.present();
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
  //let images=['https://alanbatnews.net/assets/2020-07-02/images/291617_11_1593683911.jpg'];
  this.upload_attachment_file('https://alanbatnews.net/assets/2020-07-02/images/291617_11_1593683911.jpg');
   // this.Attachments=images;
   // this.api.Attachments=this.Attachments;
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
  this.upload_attachment_file('https://alanbatnews.net/assets/2020-07-02/images/291617_11_1593683911.jpg');
   /* const cameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
    };
    this.camera.getPicture(cameraOptions).then(
      (fileUri) => {
        //this.Attachments.push("data:image/jpg;base64," + fileUri);
       // this.imgProfile = "data:image/jpg;base64," + fileUri;
       // this.imageUri = fileUri;
        //this.upload_attachment_file();
      },
      (err) => {}
    );*/
  }
  upload_attachment_file(image) {
     
    let changeImage: any = {};
    changeImage.image = image;
    changeImage.booking_id = this.api.bookid;
    changeImage.attachment_status=0;//add new Attachment
    this.util.startLoad();
    this.api.postDataWithToken("updateBookingAttachments", changeImage).subscribe(
      (res: any) => {
        if (res.success) {
          this.MedicalAttachments= res.MedicalAttachments;
          if(localStorage.getItem("Language")=="En"){
            this.util.presentToast(res.msg);
          }else{
            this.util.presentToast(res.msg_ar);
          }
        }
      },
      (err) => {
        console.log(err)
        this.util.dismissLoader();
      }
    );
  }

  delete_attachment_file(attachment_id) {
     
    let changeImage: any = {};
    changeImage.booking_id = this.api.bookid;
    changeImage.attachment_id = attachment_id;
    changeImage.attachment_status=1;//delete Attachment
    this.util.startLoad();
    this.api.postDataWithToken("updateBookingAttachments", changeImage).subscribe(
      (res: any) => {
        if (res.success) {
          this.MedicalAttachments= res.MedicalAttachments;
          if(localStorage.getItem("Language")=="En"){
            this.util.presentToast(res.msg);
          }else{
            this.util.presentToast(res.msg_ar);
          }
        }
      },
      (err) => {
        console.log(err)
        this.util.dismissLoader();
      }
    );
  }
  
  viewBankAcc(branch_id) {
   // this.util.startLoad();
    this.api.getDataWithToken("salon_Acc/" + branch_id).subscribe(
      (res: any) => {
        if (res.success) {
          //this.util.dismissLoader();
          if (res.data) {
            //this.api.salon_bank_acc=res.data;
            this.BankAcc_data=res.data;
            //this.presentTopratedModal();
          } else {

            if (localStorage.getItem("Language") == "En") {
              this.util.presentToast("Sorry, there are no bank accounts for this salon.");
            } else {
              this.util.presentToast("عذراً، لا يوجد حسابات بنكية لهذا الصالون.");
            }
          }
        }
      },
      (err) => {
       // this.util.dismissLoader();
      }
    );

  }

  async presentTopratedModal() {
   this.navCtrl.navigateForward("/salon-bank-accounts");
  /*  const modal = await this.modalCtrl.create({
      component: SalonBankAccountsPage,
      backdropDismiss: false,
      cssClass: "sort-modal"
    });
    modal.onDidDismiss().then((data) => {

      if (data["data"] != undefined) {
        console.log("data", data);

      }
    });
    return await modal.present();*/
  }

  copy_acc(x){
    this.clipboard.copy(x);
    if (localStorage.getItem("Language") == "En") {
      this.util.presentToast("The bank account number has been copied.");
    } else {
      this.util.presentToast("تم نسخ رقم الحساب المصرفي.");
    }
  }

  async ViewStatusInfo(){
    const modal = await this.modalCtrl.create({
      component: SuccessModalPage,
      componentProps: { 
        ViewStatusInfo: true,
      },
     //backdropDismiss: false,
      cssClass: "success-modal",
    });
    return await modal.present();
  }


  async ViewStatusInfo2(message){
    if(message){
      const modal = await this.modalCtrl.create({
        component: SuccessModalPage,
        componentProps: { 
          ViewStatusInfo2 : message,
        },
       //backdropDismiss: false,
        cssClass: "success-modal",
      });
      return await modal.present();
    }
      
    
   
  }

}
