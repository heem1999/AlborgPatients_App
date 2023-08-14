import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: "root",
})
export class ApiService {
  baseUrl: any = environment.baseUrl;
  category: any;
  userToken: any;
  deviceToken: any;
  verifyMo: any;
  phone_no: any;
  id: any;
  bookid: any;
  time: any = {};
  salon_bank_acc: any = {};
  order_details: any = {};
  initial_booking: any;
  about_data: any = {};
  new_login=false; //use if user login or sgin up new for the first time
  OTP_code='';
  OTP_code_fogot='';

  //borg
  selectedPayerData: any;
  selectedServices: any=[];
  Attachments: any=[];
  serviceDetails: any=[];
  Areas:any=[];

  //showorderDetails
  showOrderDetails=false;
  constructor(private translate: TranslateService,private http: HttpClient) {
    if (localStorage.getItem("token")) {
      this.userToken = localStorage.getItem("token");
      
    }

    if (localStorage.getItem("Language") == "En") {
      document.documentElement.dir = 'ltr';
      this.translate.use('en');
      
    } else {
      document.documentElement.dir = 'rtl';
      this.translate.use('ar');
    }

  }
  getData(url) {
    return this.http.get(this.baseUrl + url);
  }
  postData(url, data) {
    return this.http.post(this.baseUrl + url, data);
  }

  getDataWithToken(url) {
    let header = new HttpHeaders();
    header = header.set("Authorization", "Bearer " + this.userToken);
    header = header.set("Accept", "application/json");
    return this.http.get(this.baseUrl + url, { headers: header });
  }

  postDataWithToken(url, data) {
    let header = new HttpHeaders();
    header = header.set("Authorization", "Bearer " + this.userToken);
    header = header.set("Accept", "application/json");
    return this.http.post(this.baseUrl + url, data, { headers: header });
  }
}
