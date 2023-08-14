import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetNewPasswordPageRoutingModule } from './set-new-password-routing.module';

import { SetNewPasswordPage } from './set-new-password.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SetNewPasswordPageRoutingModule
  ],
  declarations: [SetNewPasswordPage]
})
export class SetNewPasswordPageModule {}
