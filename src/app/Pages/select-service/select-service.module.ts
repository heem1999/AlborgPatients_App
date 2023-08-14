import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectServicePageRoutingModule } from './select-service-routing.module';
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { Ng2FilterPipeModule } from "ng2-filter-pipe";
import { SelectServicePage } from './select-service.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    Ng2FilterPipeModule,
    Ng2SearchPipeModule,
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SelectServicePageRoutingModule
  ],
  declarations: [SelectServicePage]
})
export class SelectServicePageModule {}
