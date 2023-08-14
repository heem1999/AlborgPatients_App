import { UtilService } from "./../../services/util.service";
import { ApiService } from "./../../services/api.service";
import { Component, OnInit } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import { SortModal1Page } from "../sort-modal1/sort-modal1.page";
import { SortModal2Page } from "../sort-modal2/sort-modal2.page";
import { TranslateService } from '@ngx-translate/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: "app-salon-list",
  templateUrl: "./salon-list.page.html",
  styleUrls: ["./salon-list.page.scss"],
})
export class SalonListPage implements OnInit {
  term
  data: any = [];
  err: any = {};
  genderFilter: any = { contracts: { classification:  { id: 0 } } };
  type: any = "";

  sortType: any;
  catgoryName: any;
  lan;
  Contract_classifications= [];
  selectet_class=0
  constructor(
    private geolocation: Geolocation,
    public translateService: TranslateService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private api: ApiService,
    private util: UtilService
  ) {
    this.lan=localStorage.getItem("Language");
    
   // this.util.startLoad();
   this.getPayers();
  }

  selectServicess(selectedPayer){
    this.api.selectedServices=[];
    this.api.selectedPayerData = selectedPayer;
    this.navCtrl.navigateForward("/select-service");
  }
  ionViewWillEnter() {
   
  }
  doRefresh(event) {
    this.getPayers();
    event.target.complete();
  }
  ngOnInit() {}

  viewInMap() {
    this.navCtrl.navigateForward("/map-with-salon");
  }

  getPayers(){
    this.util.startLoad();
    this.api.getDataWithToken("PayerList/"+this.selectet_class).subscribe(
      (res: any) => {
        if (res.success) {
          this.api.Areas=res.Areas ;
          this.util.dismissLoader();
          
          this.data = res.data;  
          this.Contract_classifications=  this.data.Contract_classifications;
          this.Contract_classifications.sort((a,b)=> a.id-b.id);

          if(res.data.Payers.length==0){
            this.data = [];
          } else{
            this.data.Payers.forEach((element) => {
              element.showContract = false;
             });
          }       
        
          
           let category= localStorage.getItem("genderFilter");
           this.Contract_classifications.forEach(element => {
            if(category==element.id){
              this.type = element;
            }
           });
         // 
        }
      },
      (err) => {
        this.util.dismissLoader();
        this.err = err.error.errors;
      }
    );
  }
  
  async presentCategoryModal() {
      const modal = await this.modalCtrl.create({
      component: SortModal2Page,
      backdropDismiss: false,
      cssClass: "sort-modal1",
      componentProps: { 
        contract_classifications:  this.Contract_classifications,
      },
    });
    modal.onDidDismiss().then((data) => {
      
      if (data["data"] != undefined) {
      
        this.genderFilterFunc(data["data"]);
      }
    });
    return await modal.present();
  }

  genderFilterFunc(classification) {
    
    this.selectet_class=classification.id;
    this.getPayers();
    //this.type = classification;
  /*  this.data= this.data_all;
    console.log(this.data_all);
    if(classification.id!==0){
      let y=this.data;
      var show_payers=[];
      y.Payers.forEach((Payer) => {
        Payer.contracts.forEach((c) => {
       if(c.classification.id==classification.id){
        show_payers.push(Payer.id);
       }
        });
       });

   //filter payer array
       if(show_payers.length>0){
        let x=[];
        x.push(this.data);
        for (let index = 0; index < x.length; index++) {
          console.log(x[index]);
          for (let index1 = 0; index1 < show_payers.length; index1++) {
            if(show_payers[index1]!==x[index]['id']){
              if(index > -1){
                this.data.Payers.splice(index,1);
            }
             
             /// break;
             }
             }
        }
       }else{
        this.data= [];
        //this.data= this.data_all;
       }
       
    }
   */
  }

 
  filleterByLocation() {

    this.util.startLoad();

    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        let lat = resp.coords.latitude;
        let lng = resp.coords.longitude;
        this.api.getDataWithToken("categoryLocation/" + this.api.id + "/branch/"+ lat + '/' + lng).subscribe(
          (res: any) => {
            if (res.success) {
              this.util.dismissLoader();
              this.data = res.data;
            }
          },
          (err) => {
            this.util.dismissLoader();
          }
        );
      })
      .catch((error) => {
        this.util.dismissLoader();
        console.log("Error getting location", error);
      });

  }


  viewSlonDetail(id) {
    
    this.api.id = id;
    this.navCtrl.navigateForward("/salon-detail");
  }
}
