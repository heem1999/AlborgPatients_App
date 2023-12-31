import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectTimePageRoutingModule } from './select-time-routing.module';

import { SelectTimePage } from './select-time.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SelectTimePageRoutingModule
  ],
  declarations: [SelectTimePage]
})
export class SelectTimePageModule {}
