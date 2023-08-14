
import { UtilService } from "./../../services/util.service";
import { ApiService } from "./../../services/api.service";
import { Component, OnInit } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import { SuccessModalPage } from "../success-modal/success-modal.page";
declare var RazorpayCheckout: any;
import * as moment from "moment";
import { SelectTimePage } from "../select-time/select-time.page";
import { ConfirmPage } from "../confirm/confirm.page";
@Component({
  selector: "app-payment",
  templateUrl: "./payment.page.html",
  styleUrls: ["./payment.page.scss"],
})
export class PaymentPage implements OnInit {
  total: number = 0;
  data: any = { 
    name: "Hana Mohd.",
    age: '30',
    Phone1: '922755780',
    Phone2: "922755781",
    sex: "",
    visit_date: "",
    visit_location: "",
    notes: "",
    price_msg:"",
    price_calc:"",
    area_id:'',
  };
  err: any = {};
  payment_method: any = "Offline";
  lan
 
  showpassword = false;
  constructor(
    private navCtrl:NavController,
    private modalCtrl: ModalController,
    public api: ApiService,
    private util: UtilService,
  ) {
    this.lan = localStorage.getItem("Language");

   if(this.api.about_data?.app_General_Setting[0]['booking_is_block'] ==1){
      if(this.lan=='En'){
        this.booking_block(this.api.about_data?.app_General_Setting[0].booking_is_block_msg_en);
      }else{
        this.booking_block(this.api.about_data?.app_General_Setting[0].booking_is_block_msg_ar);
      }
    }

    //this.api.Areas;

   /* this.total = this.api.time.total - this.api.time.discount;
    this.util.startLoad();
    this.api.getDataWithToken("payment/setting").subscribe(
      (res: any) => {
        if (res.success) {
          this.util.dismissLoader();
          this.data = res.data;
          this.stripe.setPublishableKey(this.data.STRIPE_KEY);
          if(this.data.booking_is_block==1){
            if(this.lan=='En'){
              this.booking_block(this.data.booking_is_block_msg_en);
            }else{
              this.booking_block(this.data.booking_is_block_msg_ar);
            }

            this.navCtrl.navigateRoot('/tabs');
          }
        }
      },
      (err) => {
        this.util.dismissLoader();
        this.err = err.error.errors;
        this.navCtrl.navigateRoot('/tabs');
      }
    );*/
  }

  handleChange(x){
    if(x.target.value!==''){
      this.data.area_id=x.target.value;
      this.data.visit_location='';
      this.data.price_msg='';
       
    }
  }
  ngOnInit() { }

  sexType(x){
    this.data.sex=x;
  }

  async payNow(msg) {
    const modal = await this.modalCtrl.create({
      component: SuccessModalPage,
      backdropDismiss: false,
      cssClass: "success-modal",
      componentProps: { 
        Booking_msg: msg,
      },
    });
    return await modal.present();
  }
  
  async booking_block(data){

    const modal = await this.modalCtrl.create({
      component: SuccessModalPage,
      componentProps: { 
        booking_block: data,
      },
     //backdropDismiss: false,
      cssClass: "success-modal",
    });
    return await modal.present();
  }

 
  async selectDate() {
    const modal = await this.modalCtrl.create({
      component: SelectTimePage,
      backdropDismiss: false,
      cssClass: "success-modal",
    });
    modal.onDidDismiss()
    .then((data_time) => {
      if(data_time.data){
        this.data.visit_date=data_time.data;
      }
    
    });
    return await modal.present();
  }

  selectLocation(){
   let flag=0;
    if(!this.data.area_id) {
      if(this.lan=='En'){
        this.err.area="Please select your city.";
      }else{
        this.err.area="الرجاء تحديد مدينتك.";
      }
      flag=1;
    }

    if(flag==0){
      let loc= {
        lat: 15.5796866,
        lng: 32.5447732,
        address_en: 'Kanon Hotel, Khartoum, Sudan',
        address_ar: "فندق كانون ، الخرطوم ، السودان",
      };
      this.navCtrl.navigateForward("/map-with-salon");
      
      if(this.lan=='En'){
        this.data.visit_location=loc;
      }else{
        this.data.visit_location=loc;
      }
      

      this.util.startLoad();
      this.api.getDataWithToken("calculat_visit_by_location/"+ loc.lat+"/"+loc.lng+"/"+this.data.area_id).subscribe(
        (res: any) => {
          if (res.success) {
            this.util.dismissLoader();
            this.data.price_calc=res.data;
            if(this.lan=='En'){
              this.data.price_msg=res.msg_en;
            }else{
              this.data.price_msg=res.msg_ar;
            }
          }
        },
        (err) => {
          this.util.dismissLoader();
          this.err = err.error.errors;
        }
      );
      
    }
  }
 

 async showOrderDetails() {
  this.api.showOrderDetails=true;

  const modal = await this.modalCtrl.create({
    component: ConfirmPage,
    componentProps: { 
      //new_verssion: data,
    },
   backdropDismiss: false,
   // cssClass: "success-modal",
  });
  return await modal.present();
  }

  done() {
    this.err = {};
    let flag=0;
    if(!this.data.name) {
      if(this.lan=='En'){
        this.err.name="The patient's name is required.";
      }else{
        this.err.name="اسم المريض مطلوب.";
      }
      flag=1;
    }
    if(!this.data.age) {
      if(this.lan=='En'){
        this.err.age="The patient's age is required.";
      }else{
        this.err.age="عمر المريض مطلوب.";
      }
      flag=1;
    }
    if(!this.data.Phone1) {
      if(this.lan=='En'){
        this.err.Phone1="The Co-patient phone is required.";
      }else{
        this.err.Phone1="هاتف ملازم المريض مطلوب.";
      }
      flag=1;
    }
    if(!this.data.sex) {
      if(this.lan=='En'){
        this.err.sex="The patient's sex is required.";
      }else{
        this.err.sex="مطلوب جنس المريض.";
      }
      flag=1;
    }
    if(!this.data.visit_date) {
      if(this.lan=='En'){
        this.err.visit_date="A home visit date is required.";
      }else{
        this.err.visit_date="مطلوب تاريخ زيارة المنزل.";
      }
      flag=1;
    }
    if(!this.data.area_id) {
      if(this.lan=='En'){
        this.err.area="Please select your city.";
      }else{
        this.err.area="الرجاء تحديد مدينتك.";
      }
      flag=1;
    }
    if(!this.data.visit_location) {
      if(this.lan=='En'){
        this.err.visit_location="A home visit location is required";
      }else{
        this.err.visit_location="موقع زيارة المنزل مطلوب.";
      }
      flag=1;
    }

    if(flag==0){
      let info: any = {};
      info.selectedPayerData = this.api.selectedPayerData;
      info.selectedServices = this.api.selectedServices;
      info.Attachments = this.api.Attachments;
      info.patient_info =this.data;

      this.util.startLoad();
      this.api.postDataWithToken("booking", info).subscribe(
        (res: any) => {
          if (res.success) {
            this.util.dismissLoader();
           if(this.lan=='En'){
            this.payNow(res.msg);
          }else{
            this.payNow(res.msg_ar);
          }
          }
        },
        (err) => {
          this.util.dismissLoader();
          this.err = err.error.errors;
        }
      );
    }
  }


}
