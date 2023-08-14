import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancelBookingPageRoutingModule } from './cancel-booking-routing.module';

import { CancelBookingPage } from './cancel-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancelBookingPageRoutingModule
  ],
  declarations: [CancelBookingPage],
  exports:[CancelBookingPage]
})
export class CancelBookingPageModule {}
