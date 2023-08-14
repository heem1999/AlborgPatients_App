import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LanguageListPageRoutingModule } from './language-list-routing.module';

import { LanguageListPage } from './language-list.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    LanguageListPageRoutingModule
  ],
  declarations: [LanguageListPage]
})
export class LanguageListPageModule {}
