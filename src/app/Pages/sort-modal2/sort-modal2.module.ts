import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SortModal2PageRoutingModule } from './sort-modal2-routing.module';

import { SortModal2Page } from './sort-modal2.page';
import { SortModal1Page } from '../sort-modal1/sort-modal1.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SortModal2PageRoutingModule
  ],
  declarations: [SortModal2Page],
  exports:[SortModal2Page]
})
export class SortModal2PageModule {}
