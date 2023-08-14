import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/services/api.service';
import {SplashScreen} from '@capacitor/splash-screen';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.page.html',
  styleUrls: ['./language-list.page.scss'],
})
export class LanguageListPage implements OnInit {
  languageList:any=[]
  lang_defualt
  constructor(private api: ApiService,private translate: TranslateService,) {

    if (localStorage.getItem("Language") == "En") {
      this.lang_defualt="En";
      this.languageList=[];
      this.languageList=[
        {title:'Arabic',isActive:false,lang:"ar"},
        {title:'English',isActive:true,lang:"En"},
      ];
    } else {
      this.lang_defualt="ar";
      this.languageList=[];
      this.languageList=[
        {title:'عربي',isActive:true,lang:"ar"},
        {title:'إنجليزي',isActive:false,lang:"En"},
      ];
    }

   }

  ngOnInit() {
  }

  changeLang(selected_lang) {

    if(localStorage.getItem("Language")!==selected_lang){
      if (selected_lang == "En") {
        localStorage.setItem("Language", "En");

        /* this.translate.use('en');
         this.languageList=[];
         this.languageList=[
           {title:'Arabic',isActive:false,lang:"ar"},
           {title:'English',isActive:true,lang:"En"},
         ];*/
       } else {
         localStorage.setItem("Language", "ar");
        /* this.translate.use('ar');
         this.languageList=[];
         this.languageList=[
           {title:'عربي',isActive:true,lang:"En"},
           {title:'إنجليزي',isActive:false,lang:"ar"},
         ];*/
       }
       
       
       this.api.getDataWithToken("profile").subscribe((res: any) => {
        let lang: any = {};
        lang.selected_lang = selected_lang;
        lang.user_id = res.id;
        this.api.postDataWithToken("update_app_lang", lang).subscribe((res: any) => {
        
       }, error => {
         console.log(error)
       });
      }, error => {
       
      });
      
      SplashScreen.show();
       window.location.reload();
    }
   
      
  }

}
