import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PastOrderDetailPageRoutingModule } from './past-order-detail-routing.module';

import { PastOrderDetailPage } from './past-order-detail.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PastOrderDetailPageRoutingModule
  ],
  declarations: [PastOrderDetailPage]
})
export class PastOrderDetailPageModule {}
