import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SalonListPageRoutingModule } from "./salon-list-routing.module";

import { SalonListPage } from "./salon-list.page";
import { SortModal1PageModule } from "../sort-modal1/sort-modal1.module";
import { SortModal2PageModule } from "../sort-modal2/sort-modal2.module";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { Ng2FilterPipeModule } from "ng2-filter-pipe";
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SalonListPageRoutingModule,
    SortModal1PageModule,
    Ng2FilterPipeModule,
    Ng2SearchPipeModule,
    SortModal2PageModule,
  ],
  declarations: [SalonListPage],
})
export class SalonListPageModule {}
