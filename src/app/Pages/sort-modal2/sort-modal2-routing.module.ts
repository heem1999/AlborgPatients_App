import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SortModal2Page } from './sort-modal2.page';

const routes: Routes = [
  {
    path: '',
    component: SortModal2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SortModal2PageRoutingModule {}
