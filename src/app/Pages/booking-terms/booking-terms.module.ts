import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingTermsPageRoutingModule } from './booking-terms-routing.module';

import { BookingTermsPage } from './booking-terms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingTermsPageRoutingModule
  ],
  declarations: [BookingTermsPage]
})
export class BookingTermsPageModule {}
