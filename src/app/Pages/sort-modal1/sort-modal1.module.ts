import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SortModal1PageRoutingModule } from './sort-modal1-routing.module';

import { SortModal1Page } from './sort-modal1.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SortModal1PageRoutingModule
  ],
  declarations: [SortModal1Page],
  exports:[SortModal1Page]
})
export class SortModal1PageModule {}
