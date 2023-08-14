import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingConfirmPageRoutingModule } from './booking-confirm-routing.module';

import { BookingConfirmPage } from './booking-confirm.page';
import { CancelBookingPageModule } from '../cancel-booking/cancel-booking.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingConfirmPageRoutingModule,
    CancelBookingPageModule
  ],
  declarations: [BookingConfirmPage]
})
export class BookingConfirmPageModule {}
