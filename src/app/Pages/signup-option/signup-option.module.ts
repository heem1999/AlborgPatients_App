import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupOptionPageRoutingModule } from './signup-option-routing.module';

import { SignupOptionPage } from './signup-option.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupOptionPageRoutingModule
  ],
  declarations: [SignupOptionPage]
})
export class SignupOptionPageModule {}
