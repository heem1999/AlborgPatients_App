import { UtilService } from "./../../services/util.service";
import { ApiService } from "./../../services/api.service";
import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { InAppBrowser,InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.page.html",
  styleUrls: ["./favorites.page.scss"],
})
export class FavoritesPage implements OnInit {
  data: any = [];
  err: any = {};
  app_General_Setting=[];
  appBranches=[];
  lan
  activeSegment: any = "About Us";
  constructor(private iab: InAppBrowser,private navCtrl: NavController,private api: ApiService, private util: UtilService) {
    this.lan = localStorage.getItem("Language");
    this.data=  this.api.about_data;
    this.app_General_Setting=this.data['app_General_Setting'][0];
    this.appBranches=this.data['appBranches'];
    this.appBranches.forEach((element) => {
      element.showContract = false;
     });
  }

  ngOnInit() {}

  viewInMap(item){
  let url= "http://maps.google.com/maps?&z=15&mrt=yp&q="+item.lat+','+item.lng;
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
