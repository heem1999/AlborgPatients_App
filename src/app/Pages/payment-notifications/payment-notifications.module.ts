import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentNotificationsPageRoutingModule } from './payment-notifications-routing.module';

import { PaymentNotificationsPage } from './payment-notifications.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentNotificationsPageRoutingModule
  ],
  declarations: [PaymentNotificationsPage]
})
export class PaymentNotificationsPageModule {}
