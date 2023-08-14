import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfilePageRoutingModule } from './edit-profile-routing.module';

import { EditProfilePage } from './edit-profile.page';
import { NoArrowDirective } from 'src/app/Directive/no-arrow.directive';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfilePageRoutingModule
  ],
  declarations: [EditProfilePage]
})
export class EditProfilePageModule {}
