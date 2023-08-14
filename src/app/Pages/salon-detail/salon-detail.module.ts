import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalonDetailPageRoutingModule } from './salon-detail-routing.module';

import { SalonDetailPage } from './salon-detail.page';
import { TranslateModule } from '@ngx-translate/core';
import { LazyLoadImageModule, IntersectionObserverHooks, Attributes, LAZYLOAD_IMAGE_HOOKS } from 'ng-lazyload-image';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SalonDetailPageRoutingModule,
    LazyLoadImageModule
  ],
  declarations: [SalonDetailPage]
})
export class SalonDetailPageModule {}
