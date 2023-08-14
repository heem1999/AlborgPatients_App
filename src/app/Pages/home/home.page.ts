import { UtilService } from "./../../services/util.service";
import { ApiService } from "./../../services/api.service";
import { Component, OnInit } from "@angular/core";
import { ModalController, NavController, ToastController } from "@ionic/angular";
import { TranslateService } from '@ngx-translate/core';
import { StatusBar } from "@awesome-cordova-plugins/status-bar/ngx";
//import { FCM } from '@awesome-cordova-plugins/fcm/ngx';
import { SortModal2Page } from "../sort-modal2/sort-modal2.page";
import { SortModal1Page } from "../sort-modal1/sort-modal1.page";
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import {SplashScreen} from '@capacitor/splash-screen';
import { FcmService } from "src/app/services/fcm.service";
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { SuccessModalPage } from "../success-modal/success-modal.page";

import { Platform } from '@ionic/angular';


@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  data: any = {};
  rdata: any = [];
  err: any = {};
  sortType: any;
  catgoryName: any;
  type: any = "";
  genderFilter: any = { for_who: 0 };
  term
  tostFlag
  toast: any
 
  current_ios_version="2.2.03";
  current_android_version="20.2.2";
  public slideOpts = {

    loop: true,
    autoplay: true, //speed: "100",
    autoplayDisableOnInteraction: false,
    slidesPerView: 1.2,
    spaceBetween: 50,
    centeredSlides: true,
    initialSlide: 0,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    },
    on: {
      beforeInit() {
        const swiper = this;

        swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate() {
        const swiper = this;
        const {
          width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
        } = swiper;
        const params = swiper.params.coverflowEffect;
        const isHorizontal = swiper.isHorizontal();
        const transform$$1 = swiper.translate;
        const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
        const rotate = isHorizontal ? params.rotate : -params.rotate;
        const translate = params.depth;
        // Each slide offset from center
        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideSize = slidesSizesGrid[i];
          const slideOffset = $slideEl[0].swiperSlideOffset;
          const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

          let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
          // var rotateZ = 0
          let translateZ = -translate * Math.abs(offsetMultiplier);

          let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
          let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

          // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) translateX = 0;
          if (Math.abs(translateY) < 0.001) translateY = 0;
          if (Math.abs(translateZ) < 0.001) translateZ = 0;
          if (Math.abs(rotateY) < 0.001) rotateY = 0;
          if (Math.abs(rotateX) < 0.001) rotateX = 0;

          const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

          $slideEl.transform(slideTransform);
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;

        }

        // Set correct perspective for IE10
        if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
          const ws = $wrapperEl[0].style;
          ws.perspectiveOrigin = `${center}px 50%`;
        }
      },
      setTransition(duration) {
        const swiper = this;
        swiper.slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
      }
    }
  }
  public slideOpts2 = {
    slidesPerView: 2.8,
    initialSlide: 1,
    speed: 400,

  }

  lan

  constructor(
    private platform: Platform,
    private toastCtrl: ToastController,
    private network: Network,
    private fcmService: FcmService,
    private geolocation: Geolocation,
    private modalCtrl: ModalController,
    public translateService: TranslateService,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private navCtrl: NavController,
    private api: ApiService,
    private util: UtilService
  ) {
    //this.statusBar.backgroundColorByHexString("#00BD9A");
    this.lan = localStorage.getItem("Language");
   
    var networkmsg;
    if (this.lan == "En") {
      networkmsg = `Please turn on mobile data or wifi service`
    } else {
      networkmsg = `الرجاء تشغيل بيانات الجوال أو خدمة الواي فاي`
    }
   
    // watch network for a disconnection
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showToast(networkmsg)
    });

    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      this.showToastclose();
    });

  }
 
  ionViewWillEnter() {
    if (localStorage.getItem('isLogin')== 'true'&&this.rdata.length==0) {
      
      this.getUserDate();
    }
    SplashScreen.hide();
    
   
    setTimeout(() => {
      this.api.getDataWithToken("about_us").subscribe(
        (res: any) => {
          if (res.success) {
            this.api.about_data = res.data;
            if(res.data.app_General_Setting[0].sysytem_is_block==1){
              if(localStorage.getItem("Language")=='En'){
                this.system_block(res.data.app_General_Setting[0].sysytem_is_block_msg_en);
              }else{
                this.system_block(res.data.app_General_Setting[0].sysytem_is_block_msg_ar);
              }
            }else if(this.platform.is("android")&&this.current_android_version!==res.data.app_General_Setting[0].android_version){
              this.new_verssion(res.data1.android_version_mesg);
            }
            else if(this.platform.is("ios")&&this.current_ios_version!==res.data.app_General_Setting[0].ios_version){
              this.new_verssion(res.data1.ios_version_mesg);
            }
          }
        },
        (err) => {
        }
      );
   
    }, 300);
  }

  ngOnInit() {
   }
  
  viewPage(page) {
    //this.api.id = id.id;
    if (page == 'Home Service') {
      this.navCtrl.navigateForward("/salon-list");
    } else if (page == "My Requests"){
      this.navCtrl.navigateRoot('/tabs/appointment');
        }else if (page == "Tips & News"){
      //this.navCtrl.navigateForward("/salon-list");
    }else if (page == "About"){
      this.util.startLoad();
    this.api.getData("about_us").subscribe(
      (res: any) => {
        if (res.success) {
          this.util.dismissLoader();
        this.api.about_data = res.data;
        this.navCtrl.navigateForward("/favorites");
        }
      },
      (err) => {
        this.util.dismissLoader();
        this.err = err.error.errors;
      }
    );
     
    }
    
  }

  getUserDate() {
    this.util.isUpdateProfile.subscribe((s) => {
      if (!s) {
        //console.log('getUserDate');
        //this.util.startLoad();
      }

      this.api.getDataWithToken("profile").subscribe(
        (res: any) => {
          this.rdata = res;
          if (this.rdata) {
            if(res.status==0){//this user is block by system logout
              this.logOut();
            }
            let lang: any = {};
            lang.selected_lang = localStorage.getItem("Language");
            lang.user_id = res.id;
           // this.util.dismissLoader();
            // Trigger the push setup 
            //this.fcmService.initPush();
            this.api.postDataWithToken("update_app_lang", lang).subscribe((res: any) => {

            }, error => {
              console.log(error)
            });
            // get FCM token
            /*this.fcm.getToken().then(token => {
              let fcm_update: any = {};
              fcm_update.token = token;
              fcm_update.user_id = this.rdata.id;
              this.api.postDataWithToken("updateFCMToken", fcm_update).subscribe((res: any) => {

              }, error => {
                console.log(error)
              });
            });*/
          }

          if (s) {
            this.util.dismissLoader();
          }
        },
        (err) => {
          if (s) {
            this.util.dismissLoader();
          }
          this.err = err.error.errors;
        }
      );
    });
  }
  viewSlonDetail(id) {
    this.api.id = id;
    this.navCtrl.navigateForward("/salon-detail");
  }

  


  async showToast(msg) {
    if (!this.tostFlag) {
      this.toast = await this.toastCtrl.create({
        message: msg,
        position: 'bottom',
        color: 'danger'
      });
      this.tostFlag = true
      this.toast.present();
    }
  }


  async showToastclose() {
    
    if (this.tostFlag) {
      this.toast.dismiss();
      this.tostFlag = false
    }
  }


  async new_verssion(data){

    const modal = await this.modalCtrl.create({
      component: SuccessModalPage,
      componentProps: { 
        new_verssion: data,
      },
     backdropDismiss: false,
      cssClass: "success-modal",
    });
    return await modal.present();
  }

 
  async system_block(data){

    const modal = await this.modalCtrl.create({
      component: SuccessModalPage,
      componentProps: { 
        system_block: data,
      },
     backdropDismiss: false,
      cssClass: "success-modal",
    });
    return await modal.present();
  }

  changeLang() {

    if (localStorage.getItem("Language") == "En") {
      localStorage.setItem("Language", "ع");
      this.translate.use('en');
    } else {
      localStorage.setItem("Language", "En");
      this.translate.use('ar');
    }
      
      window.location.reload();
      SplashScreen.show();
      
  }


  logOut() {
    var old_lan=localStorage.getItem("Language");
    var intro=localStorage.getItem("intro");
    localStorage.clear();
    localStorage.setItem("Language",old_lan);
    localStorage.setItem("intro",intro);
    this.navCtrl.navigateRoot("/signin");
  }

}
