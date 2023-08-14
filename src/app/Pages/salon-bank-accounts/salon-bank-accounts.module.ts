import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalonBankAccountsPageRoutingModule } from './salon-bank-accounts-routing.module';

import { SalonBankAccountsPage } from './salon-bank-accounts.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SalonBankAccountsPageRoutingModule
  ],
  declarations: [SalonBankAccountsPage],
  exports:[SalonBankAccountsPage]
})
export class SalonBankAccountsPageModule {}
