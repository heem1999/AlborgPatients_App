import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SortModal1Page } from './sort-modal1.page';

const routes: Routes = [
  {
    path: '',
    component: SortModal1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SortModal1PageRoutingModule {}
