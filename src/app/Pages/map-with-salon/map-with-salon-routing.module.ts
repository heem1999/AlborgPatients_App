import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapWithSalonPage } from './map-with-salon.page';

const routes: Routes = [
  {
    path: '',
    component: MapWithSalonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapWithSalonPageRoutingModule {}
