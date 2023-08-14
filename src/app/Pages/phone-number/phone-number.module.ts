import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PhoneNumberPageRoutingModule } from "./phone-number-routing.module";

import { PhoneNumberPage } from "./phone-number.page";
import { NoArrowDirective } from "src/app/Directive/no-arrow.directive";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhoneNumberPageRoutingModule,
  ],
  declarations: [PhoneNumberPage, NoArrowDirective],
})
export class PhoneNumberPageModule {}
