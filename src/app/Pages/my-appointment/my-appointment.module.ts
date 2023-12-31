import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyAppointmentPageRoutingModule } from './my-appointment-routing.module';

import { MyAppointmentPage } from './my-appointment.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MyAppointmentPageRoutingModule
  ],
  declarations: [MyAppointmentPage]
})
export class MyAppointmentPageModule {}
