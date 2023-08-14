import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingTermsPage } from './booking-terms.page';

const routes: Routes = [
  {
    path: '',
    component: BookingTermsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingTermsPageRoutingModule {}
