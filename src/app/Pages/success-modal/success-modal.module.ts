import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessModalPageRoutingModule } from './success-modal-routing.module';

import { SuccessModalPage } from './success-modal.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessModalPageRoutingModule
  ],
  declarations: [SuccessModalPage],
  exports:[SuccessModalPage]
})
export class SuccessModalPageModule {}
