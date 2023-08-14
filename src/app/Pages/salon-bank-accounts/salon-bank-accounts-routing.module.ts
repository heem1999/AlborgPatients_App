import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalonBankAccountsPage } from './salon-bank-accounts.page';

const routes: Routes = [
  {
    path: '',
    component: SalonBankAccountsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalonBankAccountsPageRoutingModule {}
