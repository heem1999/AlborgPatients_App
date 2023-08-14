import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PastOrderDetailPage } from './past-order-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PastOrderDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PastOrderDetailPageRoutingModule {}
