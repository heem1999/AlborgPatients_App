import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.page.html',
  styleUrls: ['./service-details.page.scss'],
})
export class ServiceDetailsPage implements OnInit {
  data: any = [];
  testData: any = [];
  lan;
  constructor(private api: ApiService,) { 
    this.lan=localStorage.getItem("Language");
    this.data = api.serviceDetails;  
    //this.testData = api.serviceDetails.service_tests; 
    this.data.service_tests.forEach(element => {
      element.forEach(element2 => {
        element2.showContract = false;
        this.testData.push(element2.test);
      }); 
    }); 
    console.log(this.testData);
  }

  ngOnInit() {
  }

}
