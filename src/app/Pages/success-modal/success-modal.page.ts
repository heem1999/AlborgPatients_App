import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { InAppBrowser,InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.page.html',
  styleUrls: ['./success-modal.page.scss'],
})
export class SuccessModalPage implements OnInit {
  lan
  imageViewer;
  ViewStatusInfo=false
  ViewStatusInfo2=false
  new_verssion=false
  system_block=false
  booking_block=false
  Booking_msg='';
  hideHeader=true;
  sliderOpt = {
    zoom: {
      maxRatio: 1,
    },
  };
  constructor(public api: ApiService,private iab: InAppBrowser,private navParams: NavParams,private modalCtrl:ModalController,private navCtrl:NavController) { 
    /*setTimeout(() => {
      this.modalCtrl.dismiss();
      this.navCtrl.navigateRoot('/tabs/appointment');
      //this.navCtrl.navigateRoot('/booking-confirm');
    }, 3000);*/
    
   
    this.lan = localStorage.getItem("Language");
    
  }


  ngOnInit() {
  }
  
  ionViewWillEnter(){

    if(this.navParams.get('imageViewer')){
      this.hideHeader=false;
      this.imageViewer=this.navParams.get('imageViewer');
    }
    if(this.navParams.get('ViewStatusInfo2')){
      this.ViewStatusInfo2=this.navParams.get('ViewStatusInfo2');
    }
    if(this.navParams.get('Booking_msg')){
      this.Booking_msg=this.navParams.get('Booking_msg');
    }
    
    if(this.navParams.get('ViewStatusInfo')){
      this.hideHeader=false;
      this.ViewStatusInfo=this.navParams.get('ViewStatusInfo');
    }

    if(this.navParams.get('new_verssion')){
      this.new_verssion=this.navParams.get('new_verssion');
    }

    if(this.navParams.get('system_block')){
      this.system_block=this.navParams.get('system_block');
    }

    if(this.navParams.get('booking_block')){
      this.booking_block=this.navParams.get('booking_block');
    }
    
  }

  close() {
    this.api.Attachments=[];
    this.api.selectedServices=[];
    this.api.selectedPayerData=[];

    this.modalCtrl.dismiss();
    this.navCtrl.navigateRoot('/tabs/appointment');
  }
  close2() {
    this.modalCtrl.dismiss();
  }

  closeBlocking() {
    this.modalCtrl.dismiss();
    this.navCtrl.navigateRoot('/');
  }

  deleteAttachment(){
    this.modalCtrl.dismiss(true);
  }

  closeApp(){
    navigator["app"].exitApp();
  }

  openlink(url){
  let  options : InAppBrowserOptions = {
      location : 'yes',//Or 'no' 
      hidden : 'no', //Or  'yes'
      clearcache : 'yes',
      clearsessioncache : 'yes',
      zoom : 'yes',//Android only ,shows browser zoom controls 
      hardwareback : 'yes',
      mediaPlaybackRequiresUserAction : 'no',
      shouldPauseOnSuspend : 'no', //Android only 
      closebuttoncaption : 'Close', //iOS only
      disallowoverscroll : 'no', //iOS only 
      toolbar : 'yes', //iOS only 
      enableViewportScale : 'no', //iOS only 
      allowInlineMediaPlayback : 'no',//iOS only 
      presentationstyle : 'pagesheet',//iOS only 
      fullscreen : 'yes',//Windows only    
  };
    let target = "_blank";
    this.iab.create(url,target,options);
   
    
    }
  
}
