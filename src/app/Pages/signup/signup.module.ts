import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import { NoArrowDirective } from 'src/app/Directive/no-arrow.directive';
import { DirectionPageModule } from '../direction/direction.module';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule
  ],
  declarations: [SignupPage]
})
export class SignupPageModule {}
