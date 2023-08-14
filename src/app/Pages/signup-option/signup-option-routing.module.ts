import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupOptionPage } from './signup-option.page';

const routes: Routes = [
  {
    path: '',
    component: SignupOptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupOptionPageRoutingModule {}
