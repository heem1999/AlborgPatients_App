import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentNotificationsPage } from './payment-notifications.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentNotificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentNotificationsPageRoutingModule {}
