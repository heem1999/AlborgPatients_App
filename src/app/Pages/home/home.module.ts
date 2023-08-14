import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { HomePageRoutingModule } from "./home-routing.module";
import { LazyLoadImageModule, IntersectionObserverHooks, Attributes, LAZYLOAD_IMAGE_HOOKS } from 'ng-lazyload-image';

import { HomePage } from "./home.page";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { TranslateModule } from '@ngx-translate/core';
//import { SortModal1PageModule } from "../sort-modal1/sort-modal1.module";
//import { SortModal2PageModule } from "../sort-modal2/sort-modal2.module";
import { Ng2FilterPipeModule } from "ng2-filter-pipe";
@NgModule({
  imports: [
    Ng2FilterPipeModule,
    //SortModal1PageModule,
    //SortModal2PageModule,
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    HomePageRoutingModule,
    LazyLoadImageModule
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
