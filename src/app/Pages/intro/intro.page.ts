import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from '../../app.component';
import { SplashScreen } from "@capacitor/splash-screen";

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  image1: string;
  image2: string;
  image3: string;
  LoginPageSkipe: string;
  IntroPageGetStarted: string;
  IntroPageTitle2: string;
  IntroPageTitle22: string;
  IntroPageTitle3: string;
  IntroPageTitle33: string;
  lang: string;
  direction: string;
  IntroPageBack: string;
  constructor( private translate: TranslateService,private navCtrl: NavController, private appComponent: AppComponent, private menuCtrl: MenuController, public nav: NavController, public translateService: TranslateService, public platform: Platform) {


    
  }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    SplashScreen.hide();
    this.lang = localStorage.getItem("Language");
    if (this.lang == "En") {
     this.lang = 'En'
     this.changeLang();
    } else {
     this.lang = "ع";
      this.changeLang();
    }

  }

  /*changeLang() {
    
    if (this.lang == "En") {
      this.direction = 'En';
      this.image1 = "assets/img/intro1.png"
      this.image2 = "assets/img/intro2.png"
      this.image3 = "assets/img/intro3.png"
      this.translateService.use('en');
     this.menuCtrl.enable(true, "left");
     this.menuCtrl.enable(false, "right");
      this.lang = "ع";
     
    } else {
      this.direction = 'ع';
      this.translateService.use('ar');
      this.menuCtrl.enable(true, "right");
      this.menuCtrl.enable(false, "left");
      this.lang = 'En';
      this.image1 = "assets/img/AR-intro1.png"
      this.image2 = "assets/img/AR-intro2.png"
      this.image3 = "assets/img/AR-intro3.png"
      
    }

    }*/
    changeLang() {
      if (this.lang == "En") {
        this.direction = 'En';
        this.image1 = "assets/Images/intro/intro1.png"
        this.image2 = "assets/Images/intro/intro2.png"
        this.image3 = "assets/Images/intro/intro3.png"
        
        localStorage.setItem("Language", "En");
        this.translate.use('en');
        this.lang = "ع";
      } else {
        this.direction = 'ع';
        localStorage.setItem("Language", "ع");
        this.translate.use('ar');
        this.lang = "En";
        this.image1 = "assets/Images/intro/AR-intro1.png"
        this.image2 = "assets/Images/intro/AR-intro2.png"
        this.image3 = "assets/Images/intro/AR-intro3.png"
        
      }
      //SplashScreen.show();
        //window.location.reload();
    }


  

  getstarted() {
    localStorage.setItem("intro", "true");
    
    window.location.reload();
    SplashScreen.show();
    //this.navCtrl.navigateRoot('');
  }
}
